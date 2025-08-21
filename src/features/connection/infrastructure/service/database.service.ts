import { eq, inArray } from 'drizzle-orm'
import { DatabaseService } from '../../../../shared/infrastructure/service/database.service'

export class ConnectionDatabaseService {
  constructor(private readonly database: DatabaseService) {}

  get token() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return {
        create: async (data: typeof schema.token.$inferInsert) =>
          db.insert(schema.token).values(data),
        update: async (id: number, data: Partial<Omit<typeof schema.token.$inferInsert, 'id'>>) =>
          db.update(schema.token).set(data).where(eq(schema.token.id, id)),
        get: async (id: number) => db.query.token.findFirst({ where: eq(schema.token.id, id) }),
      }
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return {
        create: async (data: typeof schema.token.$inferInsert) =>
          db.insert(schema.token).values(data),
        update: async (id: number, data: Partial<Omit<typeof schema.token.$inferInsert, 'id'>>) =>
          db.update(schema.token).set(data).where(eq(schema.token.id, id)),
        get: async (id: number) => db.query.token.findFirst({ where: eq(schema.token.id, id) }),
      }
    }
  }

  get connection_status() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return {
        create: async (data: typeof schema.connection_status.$inferInsert) =>
          db.insert(schema.connection_status).values(data),
        update: async (
          id: number,
          data: Partial<Omit<typeof schema.connection_status.$inferInsert, 'id'>>
        ) =>
          db.update(schema.connection_status).set(data).where(eq(schema.connection_status.id, id)),
        get: async (id: number) =>
          db.query.connection_status.findFirst({
            where: eq(schema.connection_status.id, id),
          }),
        listByIds: async (ids: number[]) =>
          db.query.connection_status.findMany({
            where: inArray(schema.connection_status.id, ids),
          }),
      }
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return {
        create: async (data: typeof schema.connection_status.$inferInsert) =>
          db.insert(schema.connection_status).values(data),
        update: async (
          id: number,
          data: Partial<Omit<typeof schema.connection_status.$inferInsert, 'id'>>
        ) =>
          db.update(schema.connection_status).set(data).where(eq(schema.connection_status.id, id)),
        get: async (id: number) =>
          db.query.connection_status.findFirst({
            where: eq(schema.connection_status.id, id),
          }),
        listByIds: async (ids: number[]) =>
          db.query.connection_status.findMany({
            where: inArray(schema.connection_status.id, ids),
          }),
      }
    }
  }
}
