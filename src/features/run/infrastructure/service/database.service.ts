import { inject } from 'inversify'
import TYPES from '@/shared/application/di/types'
import { eq } from 'drizzle-orm'
import type { DatabaseService } from '@/shared/infrastructure/service/database.service'

export class RunDatabaseService {
  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService
  ) {}

  get schema() {
    return this.database.schema
  }

  get run() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return {
        create: async (data: typeof schema.run.$inferInsert) => db.insert(schema.run).values(data),
        update: async (id: string, data: Partial<Omit<typeof schema.run.$inferInsert, 'id'>>) =>
          db.update(schema.run).set(data).where(eq(schema.run.id, id)),
        get: async (id: string) => db.query.run.findFirst({ where: eq(schema.run.id, id) }),
        list: async (options?: Parameters<typeof db.query.run.findMany>[0]) =>
          db.query.run.findMany(options),
        listPlaying: async () =>
          db.query.run.findMany({
            where: eq(schema.run.status, 'playing'),
          }),
        delete: async (id: string) => db.delete(schema.run).where(eq(schema.run.id, id)),
      }
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return {
        create: async (data: typeof schema.run.$inferInsert) => db.insert(schema.run).values(data),
        update: async (id: string, data: Partial<Omit<typeof schema.run.$inferInsert, 'id'>>) =>
          db.update(schema.run).set(data).where(eq(schema.run.id, id)),
        get: async (id: string) => db.query.run.findFirst({ where: eq(schema.run.id, id) }),
        list: async (options?: Parameters<typeof db.query.run.findMany>[0]) =>
          db.query.run.findMany(options),
        listPlaying: async () => db.query.run.findMany({ where: eq(schema.run.status, 'playing') }),
        delete: async (id: string) => db.delete(schema.run).where(eq(schema.run.id, id)),
      }
    }
  }
}
