// Third-party imports
import { inject, injectable } from 'inversify'
import { betterAuth, type Session, type User } from 'better-auth'
import { admin } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { eq } from 'drizzle-orm'

// Shared imports
import TYPES from '../../../../shared/application/di/types'
import type { DatabaseService } from '../../../../shared/infrastructure/service/database.service'
import type { EnvService } from '../../../../shared/infrastructure/service/env.service'
import type { LoggerService } from '../../../../shared/infrastructure/service/logger.service'
import type { ServerService } from '../../../../shared/infrastructure/service/server.service'

export type AuthType = {
  user: User | null
  session: Session | null
}

@injectable()
export class AuthService {
  public auth

  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService,
    @inject(TYPES.Service.Server)
    private readonly server: ServerService
  ) {
    this.logger = this.logger.child('auth-service')
    this.logger.debug('init auth')
    this.auth = betterAuth({
      secret: this.env.get('AUTH_SECRET'),
      baseURL: this.env.get('BASE_URL'),
      database: drizzleAdapter(this.database.db, {
        provider: this.database.provider === 'postgres' ? 'pg' : 'sqlite',
        schema: {
          user: this.database.schema.user,
          session: this.database.schema.session,
          account: this.database.schema.account,
          verification: this.database.schema.verification,
        },
      }),
      emailAndPassword: {
        enabled: true,
      },
      plugins: [admin()],
      telemetry: {
        enabled: false,
      },
    })
  }

  async setup() {
    this.logger.debug('setting up auth')
    await this.setupAdminUser()
    this.server.on(['POST', 'GET'], '/api/auth/*', (c) => this.auth.handler(c.req.raw))
  }

  async setupAdminUser() {
    const email = this.env.get('AUTH_ADMIN_EMAIL')
    const adminUser = await this.getUserByEmail(email)
    if (!adminUser) {
      await this.auth.api.createUser({
        body: {
          email,
          password: this.env.get('AUTH_ADMIN_PASSWORD'),
          name: this.env.get('AUTH_ADMIN_NAME'),
          role: 'admin',
        },
      })
    }
  }

  async getUserByEmail(email: string) {
    if (this.database.provider === 'postgres') {
      const user = await this.database.postgres
        .select()
        .from(this.database.postgresSchema.user)
        .where(eq(this.database.postgresSchema.user.email, email))
        .limit(1)
      return user[0]
    }
    const user = await this.database.sqlite
      .select()
      .from(this.database.sqliteSchema.user)
      .where(eq(this.database.sqliteSchema.user.email, email))
      .limit(1)
    return user[0]
  }

  get api() {
    return this.auth.api
  }

  get handler() {
    return this.auth.handler
  }
}
