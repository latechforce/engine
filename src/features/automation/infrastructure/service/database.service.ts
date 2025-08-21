import { eq, inArray } from 'drizzle-orm'
import { DatabaseService } from '../../../../shared/infrastructure/service/database.service'

export class AutomationDatabaseService {
  constructor(private readonly database: DatabaseService) {}

  get automation_status() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return {
        create: async (data: typeof schema.automation_status.$inferInsert) =>
          db.insert(schema.automation_status).values(data),
        update: async (
          id: number,
          data: Partial<Omit<typeof schema.automation_status.$inferInsert, 'id'>>
        ) =>
          db.update(schema.automation_status).set(data).where(eq(schema.automation_status.id, id)),
        get: async (id: number) =>
          db.query.automation_status.findFirst({
            where: eq(schema.automation_status.id, id),
          }),
        listByIds: async (ids: number[]) =>
          db.query.automation_status.findMany({
            where: inArray(schema.automation_status.id, ids),
          }),
      }
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return {
        create: async (data: typeof schema.automation_status.$inferInsert) =>
          db.insert(schema.automation_status).values(data),
        update: async (
          id: number,
          data: Partial<Omit<typeof schema.automation_status.$inferInsert, 'id'>>
        ) =>
          db.update(schema.automation_status).set(data).where(eq(schema.automation_status.id, id)),
        get: async (id: number) =>
          db.query.automation_status.findFirst({
            where: eq(schema.automation_status.id, id),
          }),
        listByIds: async (ids: number[]) =>
          db.query.automation_status.findMany({
            where: inArray(schema.automation_status.id, ids),
          }),
      }
    }
  }
}
