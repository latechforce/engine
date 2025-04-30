import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import type { BunEnvServices } from './bun-env.service'

export class DrizzleSqliteDbService {
  db: ReturnType<typeof drizzle>

  constructor(private env: BunEnvServices) {
    this.db = drizzle(this.env.get('DATABASE_URL'))
  }

  async migrate() {
    migrate(this.db, { migrationsFolder: 'src/infrastucture/db/migrations/sqlite' })
  }
}
