// Third-party imports
import { injectable, inject } from 'inversify'
import { z } from 'zod/v4'

// Shared imports
import {
  ServerService,
  EnvService,
  LoggerService,
  DatabaseService,
} from '@/shared/infrastructure/service'
import { HonoContext } from '@/shared/infrastructure/di/context'
import TYPES from '@/shared/application/di/types'

// App domain imports
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import type { App } from '../../domain/entity/app.entity'
import { appSchema } from '../../domain/schema/app.schema'
import type { ValidateResult } from '../../domain/value-object/validate-result.value-object'

// User infrastructure imports
import type { AuthService } from '@/user/infrastructure/service/auth.service'

@injectable()
export class AppRepository implements IAppRepository {
  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService,
    @inject(TYPES.User.Service.Auth)
    private readonly auth: AuthService,
    @inject(TYPES.Service.Server)
    private readonly serverService: ServerService,
    @inject(TYPES.Hono.Context)
    private readonly honoContext: HonoContext
  ) {}

  info(message: string) {
    this.logger.info(message)
  }

  error(message: string) {
    this.logger.child('app-repository').error(message)
  }

  async loadEnv() {
    return this.env.load()
  }

  validate(unknownSchema: unknown): ValidateResult {
    const { success, error, data } = appSchema.safeParse(unknownSchema)
    if (!success) {
      return { error: z.prettifyError(error) }
    }
    return { schema: data }
  }

  async setup(app: App) {
    await this.database.migrate()
    await this.auth.setup()
    this.honoContext.setVariables(app)
    this.serverService.addOpenAPIDoc(app)
  }

  async start() {
    this.serverService.start()
  }

  async stop() {
    await this.database.stop()
  }
}
