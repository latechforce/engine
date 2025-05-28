import { EnvService } from '../service/env.service'
import { LoggerService } from '../service/logger.service'
import { ServerService } from '../service/server.service'
import type { IAppRepository } from '@/domain/repository-interface/app-repository.interface'
import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { DatabaseService } from '../service/database.service'
import type { AuthService } from '../service/auth.service'
import type { App } from '@/domain/entity/app.entity'
import { appValidator } from '../../domain/validator/app.validator'
import type { ValidateResult } from '@/domain/value-object/validate-result.value-object'
import { z } from 'zod/v4'
import type { ServerDi } from '../di/server.di'

@injectable()
export class AppRepository implements IAppRepository {
  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService,
    @inject(TYPES.Service.Auth)
    private readonly auth: AuthService,
    @inject(TYPES.Service.Server)
    private readonly serverService: ServerService,
    @inject(TYPES.Di.Server)
    private readonly serverDi: ServerDi
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
    const { success, error, data } = appValidator.safeParse(unknownSchema)
    if (!success) {
      return { error: z.prettifyError(error) }
    }
    return { schema: data }
  }

  async setup(app: App) {
    await this.database.migrate()
    await this.auth.setup()
    this.serverDi.setup(app)
    this.serverService.setupOpenAPI(app)
  }

  async start() {
    this.serverService.start()
  }
}
