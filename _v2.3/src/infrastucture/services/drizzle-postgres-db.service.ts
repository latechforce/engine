import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import type { BunEnvServices } from './bun-env.service'

export class DrizzlePostgresDbService {
  db: ReturnType<typeof drizzle>

  constructor(private env: BunEnvServices) {
    this.db = drizzle(this.env.get('DATABASE_URL'))
  }

  async migrate() {
    await migrate(this.db, { migrationsFolder: 'src/infrastucture/db/migrations/pg' })
  }
}
