import type { AuthService } from '../service/auth.service'
import type { App } from '@/domain/entity/app.entity'
import type { ListAutomationsUseCase } from '@/application/use-case/automation/list-automations.use-case'
import type { ListConnectionsUseCase } from '@/application/use-case/connection/list-connections.use-case'
import type { AuthenticateConnectionUseCase } from '@/application/use-case/connection/authenticate-connection.use-case'
import type { ListFormsUseCase } from '@/application/use-case/form/list-forms.use-case'
import type { GetFormUseCase } from '@/application/use-case/form/get-form.use-case'
import type { AuthType } from '../service/auth.service'
import type { EnvService } from '../service/env.service'
import type { LoggerService } from '../service/logger.service'
import type { ListRunsUseCase } from '@/application/use-case/run/list-runs.use-case'
import type { HttpTriggeredUseCase } from '@/application/use-case/trigger/http-triggered.use-case'
import { inject, injectable } from 'inversify'
import type { ServerService } from '../service/server.service'
import TYPES from './types'
import type { GetAppMetadataUseCase } from '@/application/use-case/app/get-app-metadata.use-case'

export type HonoType = {
  Variables: AuthType & {
    app: App
    auth: AuthService
    env: EnvService
    logger: LoggerService
    listRunsUseCase: ListRunsUseCase
    httpTriggeredUseCase: HttpTriggeredUseCase
    listAutomationsUseCase: ListAutomationsUseCase
    listConnectionsUseCase: ListConnectionsUseCase
    listFormsUseCase: ListFormsUseCase
    getFormUseCase: GetFormUseCase
    authenticateConnectionUseCase: AuthenticateConnectionUseCase
    getAppMetadataUseCase: GetAppMetadataUseCase
  }
}

@injectable()
export class ServerDi {
  constructor(
    @inject(TYPES.Service.Env)
    private readonly env: EnvService,
    @inject(TYPES.Service.Server)
    private readonly server: ServerService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
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
    @inject(TYPES.UseCase.ListForms)
    private readonly listFormsUseCase: ListFormsUseCase,
    @inject(TYPES.UseCase.AuthenticateConnection)
    private readonly authenticateConnectionUseCase: AuthenticateConnectionUseCase,
    @inject(TYPES.UseCase.GetForm)
    private readonly getFormUseCase: GetFormUseCase,
    @inject(TYPES.UseCase.GetAppMetadata)
    private readonly getAppMetadataUseCase: GetAppMetadataUseCase
  ) {}

  setup(app: App) {
    this.server.use(async (c, next) => {
      c.set('app', app)
      c.set('env', this.env)
      c.set('auth', this.auth)
      c.set('logger', this.logger)
      c.set('listRunsUseCase', this.listRunsUseCase)
      c.set('listAutomationsUseCase', this.listAutomationsUseCase)
      c.set('listConnectionsUseCase', this.listConnectionsUseCase)
      c.set('listFormsUseCase', this.listFormsUseCase)
      c.set('getFormUseCase', this.getFormUseCase)
      c.set('getAppMetadataUseCase', this.getAppMetadataUseCase)
      c.set('httpTriggeredUseCase', this.httpTriggeredUseCase)
      c.set('authenticateConnectionUseCase', this.authenticateConnectionUseCase)
      await next()
    })
  }
}
