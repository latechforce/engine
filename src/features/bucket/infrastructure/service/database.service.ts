import { inject, injectable } from 'inversify'
import TYPES from '@/shared/application/di/types'
import { and, eq } from 'drizzle-orm'
import { DatabaseService } from '@/shared/infrastructure/service/database.service'

@injectable()
export class BucketDatabaseService {
  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService
  ) {}

  get bucket() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return {
        create: async (data: typeof schema.bucket.$inferInsert) =>
          db.insert(schema.bucket).values(data),
        update: async (id: number, data: Partial<Omit<typeof schema.bucket.$inferInsert, 'id'>>) =>
          db.update(schema.bucket).set(data).where(eq(schema.bucket.id, id)),
        get: async (id: number) => db.query.bucket.findFirst({ where: eq(schema.bucket.id, id) }),
      }
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return {
        create: async (data: typeof schema.bucket.$inferInsert) =>
          db.insert(schema.bucket).values(data),
        update: async (id: number, data: Partial<Omit<typeof schema.bucket.$inferInsert, 'id'>>) =>
          db.update(schema.bucket).set(data).where(eq(schema.bucket.id, id)),
        get: async (id: number) => db.query.bucket.findFirst({ where: eq(schema.bucket.id, id) }),
      }
    }
  }

  get object() {
    if (this.database.provider === 'postgres') {
      const schema = this.database.postgresSchema
      const db = this.database.postgres
      return {
        create: async (data: typeof schema.object.$inferInsert) =>
          db.insert(schema.object).values(data),
        update: async (
          bucketId: number,
          key: string,
          data: Partial<Omit<typeof schema.object.$inferInsert, 'id'>>
        ) =>
          db
            .update(schema.object)
            .set(data)
            .where(and(eq(schema.object.bucket_id, bucketId), eq(schema.object.key, key))),
        get: async (bucketId: number, key: string) =>
          db.query.object.findFirst({
            where: and(eq(schema.object.bucket_id, bucketId), eq(schema.object.key, key)),
          }),
        listByBucketId: async (bucketId: number) =>
          db.query.object.findMany({ where: eq(schema.object.bucket_id, bucketId) }),
        delete: async (bucketId: number, key: string) =>
          db
            .delete(schema.object)
            .where(and(eq(schema.object.bucket_id, bucketId), eq(schema.object.key, key))),
      }
    } else {
      const schema = this.database.sqliteSchema
      const db = this.database.sqlite
      return {
        create: async (data: typeof schema.object.$inferInsert) =>
          db.insert(schema.object).values(data),
        update: async (
          bucketId: number,
          key: string,
          data: Partial<Omit<typeof schema.object.$inferInsert, 'id'>>
        ) =>
          db
            .update(schema.object)
            .set(data)
            .where(and(eq(schema.object.bucket_id, bucketId), eq(schema.object.key, key))),
        get: async (bucketId: number, key: string) =>
          db.query.object.findFirst({
            where: and(eq(schema.object.bucket_id, bucketId), eq(schema.object.key, key)),
          }),
        listByBucketId: async (bucketId: number) =>
          db.query.object.findMany({ where: eq(schema.object.bucket_id, bucketId) }),
        delete: async (bucketId: number, key: string) =>
          db
            .delete(schema.object)
            .where(and(eq(schema.object.bucket_id, bucketId), eq(schema.object.key, key))),
      }
    }
  }
}
