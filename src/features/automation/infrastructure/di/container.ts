import TYPES from '../../application/di/types'
import type { IAutomationRepository } from '@/automation/domain/repository-interface/automation-repository.interface'
import { AutomationRepository } from '../repository/automation.repository'
import { SetupAutomationUseCase } from '@/automation/application/use-case/setup-automation.use-case'
import { RunAutomationUseCase } from '@/automation/application/use-case/run-automation.use-case'
import { ListAutomationsUseCase } from '@/automation/application/use-case/list-automations.use-case'
import { AutomationHonoContext } from './context'
import type { Container } from 'inversify'

export function registerAutomationDependencies(container: Container) {
  // Register repositories
  container
    .bind<IAutomationRepository>(TYPES.Repository)
    .to(AutomationRepository)
    .inSingletonScope()

  // Register use cases
  container
    .bind<SetupAutomationUseCase>(TYPES.UseCase.Setup)
    .to(SetupAutomationUseCase)
    .inSingletonScope()
  container
    .bind<RunAutomationUseCase>(TYPES.UseCase.Run)
    .to(RunAutomationUseCase)
    .inSingletonScope()
  container
    .bind<ListAutomationsUseCase>(TYPES.UseCase.List)
    .to(ListAutomationsUseCase)
    .inSingletonScope()

  // Register context
  container
    .bind<AutomationHonoContext>(TYPES.HonoContext)
    .to(AutomationHonoContext)
    .inSingletonScope()

  return container
}
