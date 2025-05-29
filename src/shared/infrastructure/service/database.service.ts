import { inject } from 'inversify'
import TYPES from '@/shared/infrastructure/di/types'
import type { EnvService } from './env.service'
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres'
import { migrate as migratePostgres } from 'drizzle-orm/node-postgres/migrator'
import { drizzle as drizzleSqlite } from 'drizzle-orm/bun-sqlite'
import { migrate as migrateSqlite } from 'drizzle-orm/bun-sqlite/migrator'
import type { LoggerService } from './logger.service'
import * as postgresSchema from '@/shared/infrastructure/db/schema/postgres'
import * as sqliteSchema from '@/shared/infrastructure/db/schema/sqlite'
import fs from 'fs'
import path, { join } from 'path'

export class DatabaseService {
  private postgresDb?
  private sqliteDb?
  provider: 'postgres' | 'sqlite'
  url: string

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
      this.postgresDb = drizzlePostgres(this.url, {
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

  get postgres() {
    if (!this.postgresDb) {
      throw new Error('Postgres database not initialized')
    }
    return this.postgresDb
  }

  get postgresSchema() {
    return postgresSchema
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
