import { Container } from 'inversify'
import { EnvService } from '../service/env.service'
import { LoggerService } from '../service/logger.service'
import { ServerService } from '../service/server.service'
import { AppRepository } from '../repository/app.repository'
import { StartAppUseCase } from '../../application/use-case/app/start-app.use-case'
import TYPES from './types'
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import { DatabaseService } from '../service/database.service'
import { AuthService } from '../service/auth.service'
import type { IAutomationRepository } from '@/domain/repository-interface/automation-repository.interface'
import { AutomationRepository } from '../repository/automation.repository'
import type { ITriggerRepository } from '@/domain/repository-interface/trigger-repository.interface'
import { TriggerRepository } from '../repository/trigger.repository'
import type { IActionRepository } from '@/domain/repository-interface/action-repository.interface'
import { ActionRepository } from '../repository/action.repository'
import { SetupTriggerUseCase } from '@/application/use-case/trigger/setup-trigger.use-case'
import { SetupAutomationUseCase } from '@/application/use-case/automation/setup-automation.use-case'
import { RunActionUseCase } from '../../application/use-case/action/run-action.use-case'
import { RunAutomationUseCase } from '@/application/use-case/automation/run-automation.use-case'
import { CodeService } from '../service/code.service'
import { SetupActionUseCase } from '@/application/use-case/action/setup-action.use-case'
import { TemplateService } from '../service/template.service'
import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import { RunRepository } from '../repository/run.repository'
import { SetupTableUseCase } from '@/application/use-case/table/setup-table.use-case'
import type { IFieldRepository } from '@/domain/repository-interface/field-repository.interface'
import { FieldRepository } from '../repository/field.repository'
import { TableRepository } from '../repository/table.repository'
import type { ITableRepository } from '@/domain/repository-interface/table-repository.interface'
import { SetupFieldUseCase } from '@/application/use-case/field/setup-field.use-case'
import { TriggerHttpUseCase } from '@/application/use-case/trigger/trigger-http.use-case'
import { ListRunsUseCase } from '@/application/use-case/run/list-runs.use-case'
import { ValidateAppUseCase } from '@/application/use-case/app/validate-app.use-case'
import { ValidatorService } from '../service/validator.service'
import { ListAutomationsUseCase } from '@/application/use-case/automation/list-automations.use-case'
import { ListConnectionsUseCase } from '@/application/use-case/connection/list-connections.use-case'
import { AuthenticateConnectionUseCase } from '@/application/use-case/connection/authenticate-connection.use-case'
import { ConnectionRepository } from '../repository/connection.repository'
import type { IConnectionRepository } from '@/domain/repository-interface/connection-repository.interface'
import { SetupConnectionUseCase } from '@/application/use-case/connection/setup-connection.use-case'
import type { ITokenRepository } from '@/domain/repository-interface/token-repository.interface'
import { TokenRepository } from '../repository/token.repository'
import { MockAppUseCase } from '@/application/use-case/app/mock-app.use-case'

export async function registerDependencies(externals: Record<string, unknown> = {}) {
  const container = new Container()

  // Register services
  container.bind<EnvService>(TYPES.Service.Env).to(EnvService).inSingletonScope()
  const envService = container.get<EnvService>(TYPES.Service.Env)
  await envService.load()

  container.bind<LoggerService>(TYPES.Service.Logger).to(LoggerService).inSingletonScope()
  container.bind<ServerService>(TYPES.Service.Server).to(ServerService).inSingletonScope()
  container.bind<DatabaseService>(TYPES.Service.Database).to(DatabaseService).inSingletonScope()
  container.bind<AuthService>(TYPES.Service.Auth).to(AuthService).inSingletonScope()
  container.bind<CodeService>(TYPES.Service.Code).toConstantValue(new CodeService(externals))
  container.bind<TemplateService>(TYPES.Service.Template).to(TemplateService).inSingletonScope()
  container.bind<ValidatorService>(TYPES.Service.Validator).to(ValidatorService).inSingletonScope()

  // Register repositories
  container.bind<IAppRepository>(TYPES.Repository.App).to(AppRepository).inSingletonScope()
  container
    .bind<IAutomationRepository>(TYPES.Repository.Automation)
    .to(AutomationRepository)
    .inSingletonScope()
  container
    .bind<ITriggerRepository>(TYPES.Repository.Trigger)
    .to(TriggerRepository)
    .inSingletonScope()
  container.bind<IActionRepository>(TYPES.Repository.Action).to(ActionRepository).inSingletonScope()
  container.bind<IRunRepository>(TYPES.Repository.Run).to(RunRepository).inSingletonScope()
  container.bind<ITableRepository>(TYPES.Repository.Table).to(TableRepository).inSingletonScope()
  container.bind<IFieldRepository>(TYPES.Repository.Field).to(FieldRepository).inSingletonScope()
  container
    .bind<IConnectionRepository>(TYPES.Repository.Connection)
    .to(ConnectionRepository)
    .inSingletonScope()
  container.bind<ITokenRepository>(TYPES.Repository.Token).to(TokenRepository).inSingletonScope()

  // Register use cases
  container.bind<StartAppUseCase>(TYPES.UseCase.StartApp).to(StartAppUseCase).inSingletonScope()
  container
    .bind<SetupAutomationUseCase>(TYPES.UseCase.SetupAutomation)
    .to(SetupAutomationUseCase)
    .inSingletonScope()
  container
    .bind<SetupTriggerUseCase>(TYPES.UseCase.SetupTrigger)
    .to(SetupTriggerUseCase)
    .inSingletonScope()
  container
    .bind<SetupActionUseCase>(TYPES.UseCase.SetupAction)
    .to(SetupActionUseCase)
    .inSingletonScope()
  container
    .bind<RunAutomationUseCase>(TYPES.UseCase.RunAutomation)
    .to(RunAutomationUseCase)
    .inSingletonScope()
  container.bind<RunActionUseCase>(TYPES.UseCase.RunAction).to(RunActionUseCase).inSingletonScope()
  container
    .bind<SetupTableUseCase>(TYPES.UseCase.SetupTable)
    .to(SetupTableUseCase)
    .inSingletonScope()
  container
    .bind<SetupFieldUseCase>(TYPES.UseCase.SetupField)
    .to(SetupFieldUseCase)
    .inSingletonScope()
  container
    .bind<TriggerHttpUseCase>(TYPES.UseCase.TriggerHttp)
    .to(TriggerHttpUseCase)
    .inSingletonScope()
  container.bind<ListRunsUseCase>(TYPES.UseCase.ListRuns).to(ListRunsUseCase).inSingletonScope()
  container
    .bind<ListAutomationsUseCase>(TYPES.UseCase.ListAutomations)
    .to(ListAutomationsUseCase)
    .inSingletonScope()
  container
    .bind<ListConnectionsUseCase>(TYPES.UseCase.ListConnections)
    .to(ListConnectionsUseCase)
    .inSingletonScope()
  container
    .bind<ValidateAppUseCase>(TYPES.UseCase.ValidateApp)
    .to(ValidateAppUseCase)
    .inSingletonScope()
  container
    .bind<AuthenticateConnectionUseCase>(TYPES.UseCase.AuthenticateConnection)
    .to(AuthenticateConnectionUseCase)
    .inSingletonScope()
  container
    .bind<SetupConnectionUseCase>(TYPES.UseCase.SetupConnection)
    .to(SetupConnectionUseCase)
    .inSingletonScope()
  container.bind<MockAppUseCase>(TYPES.UseCase.MockApp).to(MockAppUseCase).inSingletonScope()

  return container
}
