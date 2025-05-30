import { inject } from 'inversify'
import TYPES from '@/shared/application/di/types'
import { eq } from 'drizzle-orm'
import type { DatabaseService } from '@/shared/infrastructure/service/database.service'

export type DatabaseTable<I, S, D> = {
  create(data: I): Promise<void>
  update(id: D, data: Partial<Omit<I, 'id'>>): Promise<void>
  get(id: D): Promise<S | undefined>
}

export class TableDatabaseService {
  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService
  ) {}

  get schema() {
    return this.database.schema
  }

  get transaction() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return async (
        callback: (tx: {
          table: DatabaseTable<
            typeof schema.table.$inferInsert,
            typeof schema.table.$inferSelect,
            number
          >
          table_field: DatabaseTable<
            typeof schema.field.$inferInsert,
            typeof schema.field.$inferSelect,
            number
          >
          record: DatabaseTable<
            typeof schema.record.$inferInsert,
            typeof schema.record.$inferSelect,
            string
          >
          recordField: DatabaseTable<
            typeof schema.recordField.$inferInsert,
            typeof schema.recordField.$inferSelect,
            string
          >
        }) => Promise<void>
      ) =>
        db.transaction(async (tx) => {
          await callback({
            table: {
              create: async (data) => {
                await tx.insert(schema.table).values(data)
              },
              update: async (id, data) => {
                await tx.update(schema.table).set(data).where(eq(schema.table.id, id))
              },
              get: async (id) => tx.query.table.findFirst({ where: eq(schema.table.id, id) }),
            },
            table_field: {
              create: async (data) => {
                await tx.insert(schema.field).values(data)
              },
              update: async (id, data) => {
                await tx.update(schema.field).set(data).where(eq(schema.field.id, id))
              },
              get: async (id) => tx.query.field.findFirst({ where: eq(schema.field.id, id) }),
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
            },
          })
        })
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return (
        callback: (tx: {
          table: DatabaseTable<
            typeof schema.table.$inferInsert,
            typeof schema.table.$inferSelect,
            number
          >
          table_field: DatabaseTable<
            typeof schema.field.$inferInsert,
            typeof schema.field.$inferSelect,
            number
          >
          record: DatabaseTable<
            typeof schema.record.$inferInsert,
            typeof schema.record.$inferSelect,
            string
          >
          recordField: DatabaseTable<
            typeof schema.recordField.$inferInsert,
            typeof schema.recordField.$inferSelect,
            string
          >
        }) => Promise<void>
      ) =>
        db.transaction(async (tx) => {
          await callback({
            table: {
              create: async (data) => tx.insert(schema.table).values(data),
              update: async (id, data) =>
                tx.update(schema.table).set(data).where(eq(schema.table.id, id)),
              get: async (id) => tx.query.table.findFirst({ where: eq(schema.table.id, id) }),
            },
            table_field: {
              create: async (data) => tx.insert(schema.field).values(data),
              update: async (id, data) =>
                tx.update(schema.field).set(data).where(eq(schema.field.id, id)),
              get: async (id) => tx.query.field.findFirst({ where: eq(schema.field.id, id) }),
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
            },
          })
        })
    }
  }
}
