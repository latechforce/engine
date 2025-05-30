import type { JSONSchema7 } from 'json-schema'
import TYPES from '@/shared/application/di/types'
import { inject, injectable } from 'inversify'
import type { ValidatorService } from '@/shared/infrastructure/service/validator.service'
import type {
  IRecordRepository,
  RecordTransaction,
} from '@/table/domain/repository-interface/record-repository.interface'
import type { Record } from '@/table/domain/entity/record.entity'
import type { Fields } from '@/table/domain/object-value/fields.object-value'
import type { FieldValue } from '@/table/domain/object-value/field-value.object-value'
import type { TableDatabaseService } from '../service/database.service'

@injectable()
export class RecordRepository implements IRecordRepository {
  constructor(
    @inject(TYPES.Service.Validator)
    private readonly validator: ValidatorService,
    @inject(TYPES.Table.Service.Database)
    private readonly database: TableDatabaseService
  ) {}

  validate(schema: JSONSchema7, body: unknown): body is Fields {
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
              field_id: fieldId,
              value: value?.toString(),
              created_at: record.createdAt,
              updated_at: record.updatedAt,
            })
          },
        },
      })
    })
  }
}
