import TYPES from '../../../../shared/application/di/types'
import { inject, injectable } from 'inversify'
import type { SchemaService } from '../../../../shared/infrastructure/service/validator.service'
import type {
  IRecordRepository,
  RecordTransaction,
} from '../../domain/repository-interface/record-repository.interface'
import { Record } from '../../domain/entity/record.entity'
import type { FieldValue } from '../../domain/object-value/field-value.object-value'
import type { TableDatabaseService } from '../service/database.service'
import type { Table } from '../../domain/entity/table.entity'
import type { RecordFieldRow } from '../../domain/object-value/record-field-row.object-value'
import type { SchemaObject } from 'ajv'
import type { ViewRow } from '../../domain/object-value/view-row.object-value'
import type { Fields } from '../../domain/object-value/fields.object-value'
import type { RecordRow } from '../../domain/object-value/record-row.object-value'
import type { ConditionsSchema } from '../../../action/domain/schema/condition'
import { EventEmitter } from 'events'

@injectable()
export class RecordRepository implements IRecordRepository {
  private eventEmitter = new EventEmitter()
  private createListeners: ((record: RecordRow) => Promise<void>)[] = []
  private updateListeners: ((record: RecordRow) => Promise<void>)[] = []

  constructor(
    @inject(TYPES.Service.Schema)
    private readonly validator: SchemaService,
    @inject(TYPES.Table.Service.Database)
    private readonly database: TableDatabaseService
  ) {
    this.eventEmitter.on('created', async (record: RecordRow) => {
      await Promise.all(this.createListeners.map((listener) => listener(record)))
    })
    this.eventEmitter.on('updated', async (record: RecordRow) => {
      await Promise.all(this.updateListeners.map((listener) => listener(record)))
    })
  }

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
            updated_at: new Date(),
            archived_at: new Date(),
          })
        },
        exists: async (recordId: string) => {
          const row = await tx.record.get(recordId)
          return row !== undefined
        },
        field: {
          create: async (tableId: number, fieldId: number, recordId: string, value: FieldValue) => {
            await tx.recordField.create({
              id: `${recordId}-${fieldId}`,
              record_id: recordId,
              table_field_id: fieldId,
              table_id: tableId,
              value: value?.toString(),
              created_at: new Date(),
              updated_at: new Date(),
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
              updated_at: new Date(),
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
        await tx.field.create(table.schema.id, field.id, record.id, record.fields[field.name])
      }
    })
    const recordRow: RecordRow = {
      id: record.id,
      tableId: table.schema.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      archivedAt: null,
    }
    this.eventEmitter.emit('created', recordRow)
  }

  async createMany(table: Table, records: Record[]) {
    await this.transaction(async (tx: RecordTransaction) => {
      for (const record of records) {
        await tx.create(table.schema.id, record)
        for (const field of table.schema.fields) {
          await tx.field.create(table.schema.id, field.id, record.id, record.fields[field.name])
        }
      }
    })
    for (const record of records) {
      const recordRow: RecordRow = {
        id: record.id,
        tableId: table.schema.id,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        archivedAt: null,
      }
      this.eventEmitter.emit('created', recordRow)
    }
  }

  onRecordCreated(listener: (record: RecordRow) => Promise<void>): void {
    this.createListeners.push(listener)
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
    const recordRow = await this.database.record.get(recordId)
    if (!recordRow) {
      return
    }
    const record: RecordRow = {
      id: recordRow.id,
      tableId: recordRow.table_id,
      createdAt: recordRow.created_at,
      updatedAt: recordRow.updated_at,
      archivedAt: recordRow.archived_at,
    }
    this.eventEmitter.emit('updated', record)
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
    for (const record of records) {
      const recordRow = await this.database.record.get(record.id)
      if (!recordRow) {
        return
      }
      const recordData: RecordRow = {
        id: recordRow.id,
        tableId: recordRow.table_id,
        createdAt: recordRow.created_at,
        updatedAt: recordRow.updated_at,
        archivedAt: recordRow.archived_at,
      }
      this.eventEmitter.emit('updated', recordData)
    }
  }

  onRecordUpdated(listener: (record: RecordRow) => Promise<void>): void {
    this.updateListeners.push(listener)
  }

  async read<T extends Fields>(table: Table, recordId: string): Promise<Record<T> | undefined> {
    const view = this.database.view(table)
    const row = await view.get(recordId)
    if (!row) {
      return undefined
    }
    return this.toRecord<T>(table, row)
  }

  async list<T extends Fields>(table: Table, filter?: ConditionsSchema): Promise<Record<T>[]> {
    const view = this.database.view(table)
    const rows = await view.list(filter)
    return rows.map((row) => this.toRecord<T>(table, row))
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

  async listByIds<T extends Fields>(table: Table, recordIds: string[]): Promise<Record<T>[]> {
    const view = this.database.view(table)
    const rows = await view.listByIds(recordIds)
    return rows.map((row) => this.toRecord<T>(table, row))
  }

  private toRecord<T extends Fields>(table: Table, row: ViewRow): Record<T> {
    const { _id, _created_at, _updated_at, _archived_at, ...slugs } = row
    const fields = table.convertFieldsSlugToName(slugs) as T
    return new Record<T>(
      fields,
      _id,
      new Date(_created_at),
      new Date(_updated_at),
      _archived_at ? new Date(_archived_at) : null
    )
  }
}
