import TYPES from '@/shared/application/di/types'
import { inject, injectable } from 'inversify'
import type { SchemaService } from '@/shared/infrastructure/service/validator.service'
import type {
  IRecordRepository,
  RecordTransaction,
} from '@/table/domain/repository-interface/record-repository.interface'
import { Record } from '@/table/domain/entity/record.entity'
import type { FieldValue } from '@/table/domain/object-value/field-value.object-value'
import type { TableDatabaseService } from '../service/database.service'
import type { Table } from '@/table/domain/entity/table.entity'
import type { RecordBody } from '@/table/domain/object-value/record-body.object-value'

@injectable()
export class RecordRepository implements IRecordRepository {
  constructor(
    @inject(TYPES.Service.Schema)
    private readonly validator: SchemaService,
    @inject(TYPES.Table.Service.Database)
    private readonly database: TableDatabaseService
  ) {}

  validateRecordBody(table: Table, body: unknown): body is RecordBody {
    const schema = table.getSingleOrMultipleCreateRecordSchema()
    return this.validator.validate(schema, body)
  }

  async transaction(callback: (tx: RecordTransaction) => Promise<void>) {
    await this.database.transaction(async (tx) => {
      await callback({
        create: async (tableId: number, record: Record) => {
          await tx.record.create({
            id: record.id,
            table_id: tableId,
            created_at: record.createdAt,
            updated_at: record.updatedAt,
          })
        },
        field: {
          create: async (fieldId: number, record: Record, value: FieldValue) => {
            await tx.recordField.create({
              id: `${record.id}-${fieldId}`,
              record_id: record.id,
              table_field_id: fieldId,
              value: value?.toString(),
              created_at: record.createdAt,
              updated_at: record.updatedAt,
            })
          },
        },
      })
    })
  }

  async read(table: Table, recordId: string): Promise<Record | undefined> {
    const view = this.database.view(table)
    const row = await view.get(recordId)
    if (!row) {
      return undefined
    }
    const { _id, _created_at, _updated_at, ...slugs } = row
    const fields = table.convertFieldsSlugToName(slugs)
    const record = new Record(fields, _id, new Date(_created_at), new Date(_updated_at))
    return record
  }

  async list(table: Table): Promise<Record[]> {
    const view = this.database.view(table)
    const rows = await view.list()
    return rows.map((row) => {
      const { _id, _created_at, _updated_at, ...slugs } = row
      const fields = table.convertFieldsSlugToName(slugs)
      return new Record(fields, _id, new Date(_created_at), new Date(_updated_at))
    })
  }
}
