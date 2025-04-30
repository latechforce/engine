import type { DrizzlePostgresDbService } from '../services/drizzle-postgres-db.service'
import type { ITableRepository } from '/domain/repositories/table-repository.interface'
import type { TableItem } from '/domain/value-objects/table-item.value-object'
import { tablesPgTable } from '../db/schema/pg/table-pg.schema'
import { eq } from 'drizzle-orm'

export class TablePostgresRepository implements ITableRepository {
  constructor(private postgres: DrizzlePostgresDbService) {}

  async migrate() {
    await this.postgres.migrate()
  }

  async insert(table: TableItem) {
    await this.postgres.db.insert(tablesPgTable).values(table)
  }

  async update(table: TableItem) {
    await this.postgres.db.update(tablesPgTable).set(table).where(eq(tablesPgTable.id, table.id))
  }

  async delete(id: number) {
    await this.postgres.db.delete(tablesPgTable).where(eq(tablesPgTable.id, id))
  }

  async findById(id: number) {
    const rows = await this.postgres.db.select().from(tablesPgTable).where(eq(tablesPgTable.id, id))
    return rows[0]
  }

  async findAll() {
    return this.postgres.db.select().from(tablesPgTable)
  }
}
