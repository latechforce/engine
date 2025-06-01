import TYPES from '@/shared/application/di/types'
import type {
  ITableRepository,
  TableTransaction,
} from '@/table/domain/repository-interface/table-repository.interface'
import { inject, injectable } from 'inversify'
import type { LoggerService } from '@/shared/infrastructure/service/logger.service'
import type { TableDatabaseService } from '../service/database.service'
import type { Table } from '@/table/domain/entity/table.entity'
import type { Field } from '@/table/domain/entity/field.entity'
import { sql } from 'drizzle-orm'
import type { RouteConfig } from '@hono/zod-openapi'
import type { ServerService } from '@/shared/infrastructure/service/server.service'

@injectable()
export class TableRepository implements ITableRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Server)
    private readonly server: ServerService,
    @inject(TYPES.Table.Service.Database)
    private readonly database: TableDatabaseService
  ) {}

  debug(message: string) {
    this.logger.child('table-repository').debug(message)
  }

  addOpenAPIRoute(routeConfig: RouteConfig) {
    this.server.addOpenAPIRoute(routeConfig)
  }

  async transaction(callback: (tx: TableTransaction) => Promise<void>) {
    await this.database.transaction(async (tx) => {
      await callback({
        createView: async (table: Table) => {
          const viewName = table.slug
          const provider = this.database.provider
          const columnsSql = table.fields
            .map((f) => {
              if (f.schema.type === 'checkbox') {
                if (provider === 'postgres') {
                  return `BOOL_OR(CASE WHEN f.slug = '${f.slug}' THEN rf.value = 'true' ELSE false END) AS "${f.slug}"`
                }
                // SQLite doesn't have a direct boolean type, so we'll use 1/0
                return `MAX(CASE WHEN f.slug = '${f.slug}' THEN CASE WHEN rf.value = 'true' THEN 1 ELSE 0 END END) AS "${f.slug}"`
              }
              return `MAX(CASE WHEN f.slug = '${f.slug}' THEN rf.value END) AS "${f.slug}"`
            })
            .join(',\n  ')
          const query = `
            CREATE VIEW "${viewName}" AS
            SELECT
              r.id AS _id,
              r.created_at AS _created_at,
              r.updated_at AS _updated_at,
              r.archived_at AS _archived_at,
              ${columnsSql}
            FROM record r
            JOIN record_field rf ON r.id = rf.record_id
            JOIN table_field f ON rf.table_field_id = f.id
            WHERE r.table_id = ${table.schema.id}
            GROUP BY r.id, r.created_at, r.updated_at;
          `
          await tx.execute(sql.raw(`DROP VIEW IF EXISTS "${viewName}"`))
          await tx.execute(sql.raw(query))
        },
        exists: async (id: number) => {
          const table = await tx.table.get(id)
          return table !== undefined
        },
        create: async (table: Table) => {
          await tx.table.create({
            id: table.schema.id,
            name: table.schema.name,
            slug: table.slug,
            created_at: new Date(),
            updated_at: new Date(),
          })
        },
        update: async (table: Table) => {
          await tx.table.update(table.schema.id, {
            name: table.schema.name,
            slug: table.slug,
            updated_at: new Date(),
          })
        },
        get: async (id: number) => {
          const table = await tx.table.get(id)
          return table
        },
        list: async () => {
          const tables = await tx.table.list()
          return tables
        },
        field: {
          exists: async (id: number) => {
            const field = await tx.table_field.get(id)
            return field !== undefined
          },
          create: async (tableId: number, field: Field) => {
            await tx.table_field.create({
              id: field.schema.id,
              table_id: tableId,
              name: field.schema.name,
              slug: field.slug,
              type: field.schema.type,
              required: field.schema.required ?? false,
              created_at: new Date(),
              updated_at: new Date(),
            })
          },
          update: async (field: Field) => {
            await tx.table_field.update(field.schema.id, {
              name: field.schema.name,
              slug: field.slug,
              type: field.schema.type,
              updated_at: new Date(),
            })
          },
          listByTableId: async (tableId: number) => {
            const fields = await tx.table_field.listByTableId(tableId)
            return fields
          },
        },
      })
    })
  }
}
