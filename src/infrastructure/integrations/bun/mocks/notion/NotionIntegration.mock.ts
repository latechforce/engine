import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import { NotionTableIntegration } from './NotionTableIntegration.mock'
import type { NotionConfig } from '/domain/integrations/Notion'
import type { NotionUserDto } from '/adapter/spi/dtos/NotionUserDto'
import type { SQLiteDatabaseTableDriver } from '/infrastructure/drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import slugify from 'slugify'
import type { NotionTablePageProperties } from '/domain/integrations/Notion'
import { BaseMockIntegration } from '../base'
import type { IntegrationResponse } from '/domain/integrations/base'
import type { TableConfig } from '/domain/entities/Table'
import { TableMapper } from '/adapter/api/mappers/TableMapper'
import type { TableSchema } from '/adapter/api/schemas/TableSchema'

export interface TableObject extends RecordFields {
  title: string
  properties: string
}

export interface UserObject extends RecordFields {
  email: string
  name: string | null
  avatarUrl: string | null
}

export class NotionIntegration extends BaseMockIntegration implements INotionIntegration {
  private _tables: SQLiteDatabaseTableDriver
  private _users: SQLiteDatabaseTableDriver

  constructor(public config: NotionConfig) {
    super(config, config.token)
    this._tables = this._db.table({
      name: 'tables',
      fields: [
        {
          name: 'title',
          type: 'SingleLineText',
        },
        {
          name: 'properties',
          type: 'LongText',
        },
      ],
    })
    this._tables.ensureSync()
    this._users = this._db.table({
      name: 'users',
      fields: [
        {
          name: 'email',
          type: 'SingleLineText',
        },
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'avatarUrl',
          type: 'SingleLineText',
        },
      ],
    })
    this._users.ensureSync()
  }

  getTable = async <T extends NotionTablePageProperties>(tableName: string) => {
    const id = this._slugify(tableName)
    const table = await this._tables.readById<TableObject>(id)
    if (!table) {
      throw new Error('Table not found')
    }
    const { properties } = table.fields
    const fields = JSON.parse(String(properties))
    const notionTable = new NotionTableIntegration<T>(
      this._db.table({
        name: id,
        fields,
      }),
      table
    )
    await notionTable.ensure()
    return notionTable
  }

  listAllUsers = async (): Promise<IntegrationResponse<NotionUserDto[]>> => {
    try {
      const list = await this._users.list<UserObject>()
      return {
        data: list.map((user) => ({
          id: user.id,
          email: user.fields.email,
          name: user.fields.name || '',
          avatarUrl: user.fields.avatarUrl || '',
        })),
      }
    } catch (error) {
      return { error: { status: 500, message: String(error) } }
    }
  }

  addTable = async <T extends NotionTablePageProperties>(config: TableConfig) => {
    const id = this._slugify(config.name)
    const table = await this._tables.readById<TableObject>(id)
    if (!table) {
      await this._tables.insert<TableObject>({
        id,
        fields: { title: config.name, properties: JSON.stringify(config.fields) },
        created_at: new Date().toISOString(),
      })
    }
    return this.getTable<T>(config.name)
  }

  addTableFromSchema = async <T extends NotionTablePageProperties>(schema: TableSchema) => {
    const config = TableMapper.toConfig(schema)
    return this.addTable<T>(config)
  }

  addUser = async (user: NotionUserDto) => {
    await this._users.insert<UserObject>({
      id: user.id,
      fields: {
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      created_at: new Date().toISOString(),
    })
  }

  private _slugify = (name: string) => {
    return slugify(name, { lower: true, replacement: '_', strict: true })
  }
}
