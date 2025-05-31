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
import type { RecordFieldRow } from '@/table/domain/object-value/record-field-row.object-value'
import type { SchemaObject } from 'ajv'
import type { ViewRow } from '@/table/domain/object-value/view-row.object-value'
import type { Fields } from '@/table/domain/object-value/fields.object-value'

@injectable()
export class RecordRepository implements IRecordRepository {
  constructor(
    @inject(TYPES.Service.Schema)
    private readonly validator: SchemaService,
    @inject(TYPES.Table.Service.Database)
    private readonly database: TableDatabaseService
  ) {}

  validateSchema(schema: SchemaObject, body: unknown): boolean {
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
        update: async (recordId: string) => {
          await tx.record.update(recordId, {
            updated_at: new Date(),
          })
        },
        delete: async (recordId: string) => {
          await tx.record.update(recordId, {
            archived_at: new Date(),
          })
        },
        exists: async (recordId: string) => {
          const row = await tx.record.get(recordId)
          return row !== undefined
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
          listByRecordId: async (recordId: string): Promise<RecordFieldRow[]> => {
            return await tx.recordField.listByRecordId(recordId)
          },
          update: async (fieldId: string, value: FieldValue) => {
            await tx.recordField.update(fieldId, {
              value: value?.toString(),
              updated_at: new Date(),
            })
          },
          delete: async (fieldId: string) => {
            await tx.recordField.update(fieldId, {
              archived_at: new Date(),
            })
          },
        },
      })
    })
  }

  async exists(table: Table, recordId: string): Promise<boolean> {
    const view = this.database.view(table)
    const row = await view.get(recordId)
    return row !== undefined
  }

  async create(table: Table, record: Record) {
    await this.transaction(async (tx: RecordTransaction) => {
      await tx.create(table.schema.id, record)
      for (const field of table.schema.fields) {
        await tx.field.create(field.id, record, record.fields[field.name])
      }
    })
  }

  async createMany(table: Table, records: Record[]) {
    await this.transaction(async (tx: RecordTransaction) => {
      for (const record of records) {
        await tx.create(table.schema.id, record)
        for (const field of table.schema.fields) {
          await tx.field.create(field.id, record, record.fields[field.name])
        }
      }
    })
  }

  async update(recordId: string, fields: Fields) {
    await this.transaction(async (tx: RecordTransaction) => {
      const recordsFields = await tx.field.listByRecordId(recordId)
      for (const key of Object.keys(fields)) {
        const recordField = recordsFields.find((recordField) => recordField.name === key)
        if (recordField) await tx.field.update(recordField.id, fields[key])
      }
      await tx.update(recordId)
    })
  }

  async updateMany(records: { id: string; fields: Fields }[]) {
    await this.transaction(async (tx: RecordTransaction) => {
      for (const record of records) {
        const recordsFields = await tx.field.listByRecordId(record.id)
        for (const key of Object.keys(record.fields)) {
          const recordField = recordsFields.find((field) => field.name === key)
          if (recordField) await tx.field.update(recordField.id, record.fields[key])
        }
        await tx.update(record.id)
      }
    })
  }

  async read(table: Table, recordId: string): Promise<Record | undefined> {
    const view = this.database.view(table)
    const row = await view.get(recordId)
    if (!row) {
      return undefined
    }
    return this.toRecord(table, row)
  }

  async list(table: Table): Promise<Record[]> {
    const view = this.database.view(table)
    const rows = await view.list()
    return rows.map((row) => this.toRecord(table, row))
  }

  async delete(recordId: string) {
    await this.transaction(async (tx) => {
      const fields = await tx.field.listByRecordId(recordId)
      for (const field of fields) {
        await tx.field.delete(field.id)
      }
      await tx.delete(recordId)
    })
  }

  async deleteMany(recordIds: string[]) {
    await this.transaction(async (tx) => {
      for (const recordId of recordIds) {
        const fields = await tx.field.listByRecordId(recordId)
        for (const field of fields) {
          await tx.field.delete(field.id)
        }
        await tx.delete(recordId)
      }
    })
  }

  async listByIds(table: Table, recordIds: string[]): Promise<Record[]> {
    const view = this.database.view(table)
    const rows = await view.listByIds(recordIds)
    return rows.map((row) => this.toRecord(table, row))
  }

  private toRecord(table: Table, row: ViewRow): Record {
    const { _id, _created_at, _updated_at, _archived_at, ...slugs } = row
    const fields = table.convertFieldsSlugToName(slugs)
    return new Record(
      fields,
      _id,
      new Date(_created_at),
      new Date(_updated_at),
      _archived_at ? new Date(_archived_at) : null
    )
  }
}
