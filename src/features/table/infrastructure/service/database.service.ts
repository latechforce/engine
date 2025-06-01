import { inject, injectable } from 'inversify'
import TYPES from '@/shared/application/di/types'
import { eq, type SQL } from 'drizzle-orm'
import type { DatabaseService } from '@/shared/infrastructure/service/database.service'
import { Kysely, PostgresDialect, type Dialect } from 'kysely'
import { BunWorkerDialect } from 'kysely-bun-worker'
import type { Table } from '@/table/domain/entity/table.entity'
import type { ViewRow } from '@/table/domain/object-value/view-row.object-value'
import type { RecordFieldRow } from '@/table/domain/object-value/record-field-row.object-value'

type Base<I, S, D> = {
  create(data: I): Promise<void>
  update(id: D, data: Partial<Omit<I, 'id'>>): Promise<void>
  get(id: D): Promise<S | undefined>
}

type DatabaseTable<I, S> = Base<I, S, number> & {
  list(): Promise<S[]>
}

type DatabaseTableField<I, S> = Base<I, S, number> & {
  listByTableId(tableId: number): Promise<S[]>
}

type DatabaseRecord<I, S> = Base<I, S, string>

type DatabaseRecordField<I, S> = Base<I, S, string> & {
  listByRecordId(recordId: string): Promise<RecordFieldRow[]>
}

@injectable()
export class TableDatabaseService {
  private readonly databaseView: Kysely<{
    [key: string]: ViewRow
  }>

  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService
  ) {
    let dialect: Dialect
    if (database.provider === 'postgres') {
      dialect = new PostgresDialect({
        pool: database.postgresPool,
      })
    } else {
      dialect = new BunWorkerDialect({
        url: database.url,
      })
    }
    this.databaseView = new Kysely({
      dialect,
    })
  }

  get provider() {
    return this.database.provider
  }

  get schema() {
    return this.database.schema
  }

  get transaction() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return async (
        callback: (tx: {
          execute: (query: SQL) => Promise<void>
          table: DatabaseTable<typeof schema.table.$inferInsert, typeof schema.table.$inferSelect>
          table_field: DatabaseTableField<
            typeof schema.field.$inferInsert,
            typeof schema.field.$inferSelect
          >
          record: DatabaseRecord<
            typeof schema.record.$inferInsert,
            typeof schema.record.$inferSelect
          >
          recordField: DatabaseRecordField<
            typeof schema.recordField.$inferInsert,
            typeof schema.recordField.$inferSelect
          >
        }) => Promise<void>
      ) =>
        db.transaction(async (tx) => {
          await callback({
            execute: async (query) => {
              await tx.execute(query)
            },
            table: {
              create: async (data) => {
                await tx.insert(schema.table).values(data)
              },
              update: async (id, data) => {
                await tx.update(schema.table).set(data).where(eq(schema.table.id, id))
              },
              get: async (id) => tx.query.table.findFirst({ where: eq(schema.table.id, id) }),
              list: async () => tx.select().from(schema.table),
            },
            table_field: {
              create: async (data) => {
                await tx.insert(schema.field).values(data)
              },
              update: async (id, data) => {
                await tx.update(schema.field).set(data).where(eq(schema.field.id, id))
              },
              get: async (id) => tx.query.field.findFirst({ where: eq(schema.field.id, id) }),
              listByTableId: async (tableId) =>
                tx.select().from(schema.field).where(eq(schema.field.table_id, tableId)),
            },
            record: {
              create: async (data) => {
                await tx.insert(schema.record).values(data)
              },
              update: async (id, data) => {
                await tx.update(schema.record).set(data).where(eq(schema.record.id, id))
              },
              get: async (id) => tx.query.record.findFirst({ where: eq(schema.record.id, id) }),
            },
            recordField: {
              create: async (data) => {
                await tx.insert(schema.recordField).values(data)
              },
              update: async (id, data) => {
                await tx.update(schema.recordField).set(data).where(eq(schema.recordField.id, id))
              },
              get: async (id) =>
                tx.query.recordField.findFirst({ where: eq(schema.recordField.id, id) }),
              listByRecordId: async (recordId) =>
                tx
                  .select({
                    id: schema.recordField.id,
                    name: schema.field.name,
                    value: schema.recordField.value,
                  })
                  .from(schema.recordField)
                  .innerJoin(schema.field, eq(schema.recordField.table_field_id, schema.field.id))
                  .where(eq(schema.recordField.record_id, recordId)),
            },
          })
        })
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return (
        callback: (tx: {
          execute: (query: SQL) => Promise<void>
          table: DatabaseTable<typeof schema.table.$inferInsert, typeof schema.table.$inferSelect>
          table_field: DatabaseTableField<
            typeof schema.field.$inferInsert,
            typeof schema.field.$inferSelect
          >
          record: DatabaseRecord<
            typeof schema.record.$inferInsert,
            typeof schema.record.$inferSelect
          >
          recordField: DatabaseRecordField<
            typeof schema.recordField.$inferInsert,
            typeof schema.recordField.$inferSelect
          >
        }) => Promise<void>
      ) =>
        db.transaction(async (tx) => {
          await callback({
            execute: async (query) => {
              tx.run(query)
            },
            table: {
              create: async (data) => tx.insert(schema.table).values(data),
              update: async (id, data) =>
                tx.update(schema.table).set(data).where(eq(schema.table.id, id)),
              get: async (id) => tx.query.table.findFirst({ where: eq(schema.table.id, id) }),
              list: async () => tx.select().from(schema.table),
            },
            table_field: {
              create: async (data) => tx.insert(schema.field).values(data),
              update: async (id, data) =>
                tx.update(schema.field).set(data).where(eq(schema.field.id, id)),
              get: async (id) => tx.query.field.findFirst({ where: eq(schema.field.id, id) }),
              listByTableId: async (tableId) =>
                tx.select().from(schema.field).where(eq(schema.field.table_id, tableId)),
            },
            record: {
              create: async (data) => tx.insert(schema.record).values(data),
              update: async (id, data) =>
                tx.update(schema.record).set(data).where(eq(schema.record.id, id)),
              get: async (id) => tx.query.record.findFirst({ where: eq(schema.record.id, id) }),
            },
            recordField: {
              create: async (data) => tx.insert(schema.recordField).values(data),
              update: async (id, data) =>
                tx.update(schema.recordField).set(data).where(eq(schema.recordField.id, id)),
              get: async (id) =>
                tx.query.recordField.findFirst({ where: eq(schema.recordField.id, id) }),
              listByRecordId: async (recordId) =>
                tx
                  .select({
                    id: schema.recordField.id,
                    name: schema.field.name,
                    value: schema.recordField.value,
                  })
                  .from(schema.recordField)
                  .innerJoin(schema.field, eq(schema.recordField.table_field_id, schema.field.id))
                  .where(eq(schema.recordField.record_id, recordId)),
            },
          })
        })
    }
  }

  view(table: Table) {
    const view = this.databaseView.selectFrom(table.slug)
    return {
      get: async (id: string): Promise<ViewRow | undefined> => {
        const record = await view
          .selectAll()
          .where('_archived_at', 'is', null)
          .where('_id', '=', id)
          .executeTakeFirst()
        return record ? this.postProcessViewRecord(table, record) : undefined
      },
      list: async (): Promise<ViewRow[]> => {
        const records = await view.selectAll().where('_archived_at', 'is', null).execute()
        return this.postProcessViewRecords(table, records)
      },
      listByIds: async (ids: string[]): Promise<ViewRow[]> => {
        const records = await view
          .selectAll()
          .where('_archived_at', 'is', null)
          .where('_id', 'in', ids)
          .execute()
        return this.postProcessViewRecords(table, records)
      },
    }
  }

  isViewRow(record: unknown): record is ViewRow {
    return (
      typeof record === 'object' &&
      record !== null &&
      '_id' in record &&
      '_created_at' in record &&
      '_updated_at' in record &&
      '_archived_at' in record
    )
  }

  postProcessViewRecord(
    table: Table,
    record: {
      [key: string]: unknown
    }
  ): ViewRow {
    if (!this.isViewRow(record)) {
      throw new Error('Invalid view row')
    }
    if (this.provider === 'sqlite') {
      for (const field of table.fields) {
        if (field.schema.type === 'checkbox') {
          record[field.slug] = record[field.slug] === 1
        }
      }
      return record
    }
    return record
  }

  postProcessViewRecords(
    table: Table,
    records: {
      [key: string]: unknown
    }[]
  ): ViewRow[] {
    return records.map((record) => this.postProcessViewRecord(table, record))
  }
}
