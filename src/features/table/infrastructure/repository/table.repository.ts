import TYPES from '@/shared/application/di/types'
import type {
  ITableRepository,
  TableTransaction,
} from '@/table/domain/repository-interface/table-repository.interface'
import { inject, injectable } from 'inversify'
import type { LoggerService } from '@/shared/infrastructure/service/logger.service'
import type { TableDatabaseService } from '../service/database.service'
import type { Table } from '@/table/domain/entity/table.entity'
import type { FieldSchema } from '@/table/domain/schema/field'

@injectable()
export class TableRepository implements ITableRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Table.Service.Database)
    private readonly database: TableDatabaseService
  ) {}

  debug(message: string) {
    this.logger.child('table-repository').debug(message)
  }

  async transaction(callback: (tx: TableTransaction) => Promise<void>) {
    await this.database.transaction(async (tx) => {
      await callback({
        exists: async (id: number) => {
          return tx.table.get(id) !== undefined
        },
        create: async (table: Table) => {
          await tx.table.create({
            id: table.schema.id,
            name: table.schema.name,
            created_at: new Date(),
            updated_at: new Date(),
          })
        },
        update: async (table: Table) => {
          await tx.table.update(table.schema.id, {
            name: table.schema.name,
            updated_at: new Date(),
          })
        },
        field: {
          exists: async (id: number) => {
            return tx.table_field.get(id) !== undefined
          },
          create: async (tableId: number, field: FieldSchema) => {
            await tx.table_field.create({
              id: field.id,
              table_id: tableId,
              name: field.name,
              type: field.type,
              created_at: new Date(),
              updated_at: new Date(),
            })
          },
          update: async (field: FieldSchema) => {
            await tx.table_field.update(field.id, {
              name: field.name,
              type: field.type,
              updated_at: new Date(),
            })
          },
        },
      })
    })
  }
}
