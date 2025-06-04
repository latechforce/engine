// External dependencies
import { inject } from 'inversify'
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres'
import { migrate as migratePostgres } from 'drizzle-orm/node-postgres/migrator'
import { drizzle as drizzleSqlite } from 'drizzle-orm/bun-sqlite'
import { migrate as migrateSqlite } from 'drizzle-orm/bun-sqlite/migrator'

// Internal imports
import TYPES from '../../application/di/types'
import type { EnvService } from './env.service'
import type { LoggerService } from './logger.service'
import * as postgresSchema from '../db/schema/postgres'
import * as sqliteSchema from '../db/schema/sqlite'

// Node.js built-in modules
import fs from 'fs'
import path, { join } from 'path'
import { Pool } from 'pg'

export class DatabaseService {
  private readonly postgresDb?
  private readonly sqliteDb?
  private readonly pgPool?: Pool
  public readonly provider: 'postgres' | 'sqlite'
  public readonly url: string

  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {
    this.logger = this.logger.child('database-service')
    this.provider = this.env.get('DATABASE_PROVIDER')
    this.url = this.env.get('DATABASE_URL')
    this.logger.debug(`init database with "${this.provider}" provider`)
    if (this.provider === 'postgres') {
      this.pgPool = new Pool({
        connectionString: this.url,
      })
      this.postgresDb = drizzlePostgres(this.pgPool, {
        schema: postgresSchema,
      })
    } else {
      if (this.isLocalSQLiteFile(this.url)) {
        fs.mkdirSync(path.dirname(this.url), { recursive: true })
      }
      this.sqliteDb = drizzleSqlite(this.url, {
        schema: sqliteSchema,
      })
    }
  }

  async migrate() {
    this.logger.debug('migrate database')
    if (this.provider === 'postgres') {
      await migratePostgres(this.postgres, {
        migrationsFolder: join(__dirname, '../db/migrations/postgres'),
      })
    } else {
      migrateSqlite(this.sqlite, {
        migrationsFolder: join(__dirname, '../db/migrations/sqlite'),
      })
    }
  }

  async stop() {
    if (this.provider === 'postgres') {
      await this.postgresPool.end()
    }
  }

  get postgres() {
    if (!this.postgresDb) {
      throw new Error('Postgres database not initialized')
    }
    return this.postgresDb
  }

  get postgresSchema() {
    return postgresSchema
  }

  get postgresPool() {
    if (!this.pgPool) {
      throw new Error('Postgres pool not initialized')
    }
    return this.pgPool
  }

  get sqlite() {
    if (!this.sqliteDb) {
      throw new Error('SQLite database not initialized')
    }
    return this.sqliteDb
  }

  get sqliteSchema() {
    return sqliteSchema
  }

  get db() {
    return this.provider === 'postgres' ? this.postgres : this.sqlite
  }

  get schema() {
    return this.provider === 'postgres' ? postgresSchema : sqliteSchema
  }

  private isLocalSQLiteFile(url: string): boolean {
    if (url === ':memory:' || url.startsWith('file::memory:')) return false
    if (url.startsWith('file:')) {
      const pathPart = url.slice(5)
      const pathWithoutQuery = pathPart.split('?')[0]
      return !pathWithoutQuery?.startsWith(':') && pathWithoutQuery !== ''
    }
    return !url.includes(':')
  }
}
