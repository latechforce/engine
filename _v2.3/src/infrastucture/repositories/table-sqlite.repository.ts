import { tablesSqliteTable } from '../db/schema/sqlite/table-sqlite.schema'
import type { DrizzleSqliteDbService } from '../services/drizzle-sqlite-db.service'
import type { ITableRepository } from '/domain/repositories/table-repository.interface'
import type { TableItem } from '/domain/value-objects/table-item.value-object'
import { eq } from 'drizzle-orm'

export class TableSqliteRepository implements ITableRepository {
  constructor(private sqlite: DrizzleSqliteDbService) {}

  async migrate() {
    await this.sqlite.migrate()
  }

  async insert(table: TableItem) {
    await this.sqlite.db.insert(tablesSqliteTable).values(this.preprocess(table))
  }

  async update(table: TableItem) {
    await this.sqlite.db
      .update(tablesSqliteTable)
      .set(this.preprocess(table))
      .where(eq(tablesSqliteTable.id, table.id))
  }

  async delete(id: number) {
    await this.sqlite.db.delete(tablesSqliteTable).where(eq(tablesSqliteTable.id, id))
  }

  async findById(id: number) {
    const rows = await this.sqlite.db
      .select()
      .from(tablesSqliteTable)
      .where(eq(tablesSqliteTable.id, id))
    return rows[0] ? this.postprocess(rows[0]) : undefined
  }

  async findAll() {
    const rows = await this.sqlite.db.select().from(tablesSqliteTable)
    return rows.map(this.postprocess)
  }

  private preprocess(table: TableItem) {
    return {
      id: table.id,
      name: table.name,
      created_at: table.created_at?.getTime(),
      updated_at: table.updated_at?.getTime(),
    }
  }

  private postprocess(table: typeof tablesSqliteTable.$inferSelect) {
    return {
      id: table.id,
      name: table.name,
      created_at: new Date(table.created_at),
      updated_at: new Date(table.updated_at),
    }
  }
}
