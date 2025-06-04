// Third-party imports
import type { Container } from 'inversify'

// Automation domain imports
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'

// Automation application imports
import TYPES from '../../application/di/types'
import { SetupAutomationUseCase } from '../../application/use-case/setup-automation.use-case'
import { RunAutomationUseCase } from '../../application/use-case/run-automation.use-case'
import { ListAutomationsUseCase } from '../../application/use-case/list-automations.use-case'

// Automation infrastructure imports
import { AutomationRepository } from '../repository/automation.repository'
import { AutomationHonoContext } from './context'

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
