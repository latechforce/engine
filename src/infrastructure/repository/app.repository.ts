import { EnvService } from '../service/env.service'
import { LoggerService } from '../service/logger.service'
import { ServerService } from '../service/server.service'
import type { IAppRepository } from '@/domain/repository-interface/app-repository.interface'
import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { DatabaseService } from '../service/database.service'
import type { AuthService } from '../service/auth.service'
import type { App } from '@/domain/entity/app.entity'
import type { ListRunsUseCase } from '@/application/use-case/run/list-runs.use-case'
import type { HttpTriggeredUseCase } from '@/application/use-case/trigger/http-triggered.use-case'
import { appValidator } from '../../domain/validator/app.validator'
import type { ValidateResult } from '@/domain/value-object/validate-result.value-object'
import { z } from 'zod/v4'
import type { ListAutomationsUseCase } from '@/application/use-case/automation/list-automations.use-case'
import type { ListConnectionsUseCase } from '@/application/use-case/connection/list-connections.use-case'
import type { AuthenticateConnectionUseCase } from '@/application/use-case/connection/authenticate-connection.use-case'

@injectable()
export class AppRepository implements IAppRepository {
  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Server)
    private readonly server: ServerService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService,
    @inject(TYPES.Service.Auth)
    private readonly auth: AuthService,
    @inject(TYPES.UseCase.ListRuns)
    private readonly listRunsUseCase: ListRunsUseCase,
    @inject(TYPES.UseCase.TriggerHttp)
    private readonly httpTriggeredUseCase: HttpTriggeredUseCase,
    @inject(TYPES.UseCase.ListAutomations)
    private readonly listAutomationsUseCase: ListAutomationsUseCase,
    @inject(TYPES.UseCase.ListConnections)
    private readonly listConnectionsUseCase: ListConnectionsUseCase,
    @inject(TYPES.UseCase.AuthenticateConnection)
    private readonly authenticateConnectionUseCase: AuthenticateConnectionUseCase
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
    this.server.use(async (c, next) => {
      c.set('env', this.env)
      c.set('auth', this.auth)
      c.set('app', app)
      c.set('logger', this.logger)
      c.set('listRunsUseCase', this.listRunsUseCase)
      c.set('listAutomationsUseCase', this.listAutomationsUseCase)
      c.set('listConnectionsUseCase', this.listConnectionsUseCase)
      c.set('httpTriggeredUseCase', this.httpTriggeredUseCase)
      c.set('authenticateConnectionUseCase', this.authenticateConnectionUseCase)
      await next()
    })
    this.server.setupOpenAPI(app)
  }

  async start() {
    this.server.start()
  }
}
