import fs from 'fs-extra'
import { join } from 'path'
import { execSync } from 'child_process'
import { StringUtils } from 'shared-common'

import type { DatabaseInterface } from 'shared-database'
import type {
  OrmProviderInterface,
  OrmProviderTableInterface,
  OrmProviderTablesInterface,
} from 'server-database'
import type { TableInterface } from 'shared-table'
import type { ProviderProps } from '../../interfaces/provider'

class PrismaOrmProvider implements OrmProviderInterface {
  private appName: string
  private appVersion: string
  private database: DatabaseInterface
  private pathToSchema: string

  constructor({ configUtils }: ProviderProps) {
    const { name: appName, version: appVersion, database } = configUtils.get()
    this.appName = appName
    this.appVersion = appVersion
    this.database = database
    this.pathToSchema = join(process.cwd(), 'prisma/schema.prisma')
  }

  private getModelName(name: string): string {
    return name
      .split('_')
      .map((word) => StringUtils.singular(StringUtils.capitalize(word)))
      .join('')
  }

  public getTable(name: string, orm: OrmProviderTablesInterface): OrmProviderTableInterface {
    const table = orm[StringUtils.lowarize(this.getModelName(name))]
    if (table && this.database.provider === 'sqlite') {
      table.createMany = async ({ data }) =>
        Promise.all(data.map((row) => table.create({ data: row })))
    }
    return table
  }

  public getTableEnumName(table: string, field: string): string {
    return StringUtils.capitalize(this.getModelName(table)) + StringUtils.capitalize(field)
  }

  public setConnectionSchema(database: DatabaseInterface): void {
    let binaryTargets = process.env.PRISMA_BINARY_TARGETS ?? ''
    if (binaryTargets)
      binaryTargets = `binaryTargets = ["${binaryTargets.split(',').join('", "')}"]`
    const datasourceSchema = `\n\ngenerator client {
      provider      = "prisma-client-js"
      ${binaryTargets}
    }
    
    datasource db {
      provider = "${database.provider}"
      url      = "${database.url}"
    }`
    fs.ensureFileSync(this.pathToSchema)
    fs.writeFileSync(this.pathToSchema, datasourceSchema)
  }

  public addTableSchema(tableName: string, tableConfig: TableInterface): void {
    const modelName = this.getModelName(tableName)
    const { fields, unique } = tableConfig
    const enums: string[] = []
    let modelSchema = `\n\nmodel ${modelName} {
      ${Object.keys(fields)
        .map((fieldName: string) => {
          if (['Formula'].includes(fields[fieldName].type)) return ''
          const field = fields[fieldName]
          const functions = ['uuid()', 'cuid()', 'autoincrement()', 'now()']
          let enumName: string | undefined
          let relationName: string | undefined
          if (field.type === 'SingleSelect' && field.options) {
            if (!['sqlite', 'sqlserver'].includes(this.database.provider)) {
              enumName = this.getTableEnumName(tableName, fieldName)
              enums.push(`\n\nenum ${enumName} {
              ${field.options.join('\n')}
            }`)
            } else {
              enumName = 'String'
            }
          } else if (field.type === 'Link') {
            relationName = this.getModelName(field.table)
          }
          const fieldType = enumName ?? relationName ?? field.type
          const defaultValue =
            fieldType === 'String' && !functions.includes(String(field.default))
              ? `"${field.default}"`
              : field.default
          const isRequired = field.optional || fieldType === 'Boolean' ? '?' : ''
          const isList = field.multiple ? '[]' : ''
          const isPrimary = field.primary ? ' @id' : ''
          const isUnique = field.unique ? ' @unique' : ''
          const hasDefault = field.default != null ? ` @default(${defaultValue})` : ''
          const hasRelation = field.relation
            ? ` @relation(fields: [${field.relation.fields.join(
                ','
              )}], references: [${field.relation.references.join(',')}], onDelete: ${
                field.relation.onDelete
              })`
            : ''
          return `${fieldName} ${fieldType}${isRequired}${isList}${isPrimary}${isUnique}${hasDefault}${hasRelation}`
        })
        .join('\n')}
  
      ${unique ? `@@unique([${unique.join(', ')}])` : ''}
      ${tableName ? `@@map("${tableName}")` : ''}
    }`
    if (enums.length > 0) {
      modelSchema += enums.join('')
    }
    // update the prisma.schema if the model already exist in schema, append it otherwise
    const schema = fs.readFileSync(this.pathToSchema, 'utf8')
    if (schema.includes(`model ${modelName}`)) {
      const regex = new RegExp(`model ${modelName} {[^}]*}`, 'g')
      modelSchema = schema.replace(regex, modelSchema)
      fs.writeFileSync(this.pathToSchema, modelSchema)
    } else {
      fs.appendFileSync(this.pathToSchema, modelSchema)
    }
  }

  public async generateClient(): Promise<void> {
    execSync(`npx prisma format`)
    execSync(`npx prisma generate`)
  }

  public async prepareMigration(): Promise<void> {
    const name = StringUtils.slugify(this.appName + '_' + this.appVersion)
    execSync(`npx prisma migrate dev --name=${name} --skip-generate --skip-seed --create-only`, {
      stdio: 'inherit',
    })
  }

  public async applyMigration(): Promise<void> {
    execSync(`npx prisma migrate deploy`, { stdio: 'inherit' })
  }

  public async buildOrmFile(): Promise<void> {
    const ormFile = join(process.cwd(), 'app/orm.js')
    const ormFileContent = `import { PrismaClient } from '@prisma/client'

    const prisma = new PrismaClient()

    export default prisma.$extends({
      query: {
        invoice: {
          async create({ args, query }) {
            delete args.data.total_amount
            return query(args)
          },
          async update({ args, query }) {
            delete args.data.total_amount
            return query(args)
          },
          async findMany({ args, query }) {
            const invoices = await query(args)
            if (invoices?.length > 0) {
              for (const invoice of invoices) {
                const { quantity, unit_price } = invoice
                invoice.total_amount = quantity * unit_price
              }
            }
            return invoices
          },
          async findUnique ({ args, query }) {
            const invoice = await query(args)
            if (invoice) {
              const { quantity, unit_price } = invoice
              invoice.total_amount = quantity * unit_price
            }
            return invoice
          }
        },
      },
    })`
    fs.ensureFileSync(ormFile)
    fs.writeFileSync(ormFile, ormFileContent)
  }
}

export default PrismaOrmProvider