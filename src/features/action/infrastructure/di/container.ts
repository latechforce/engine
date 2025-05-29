import type { IActionRepository } from '@/action/domain/repository-interface/action-repository.interface'
import { CodeService } from '@/action/infrastructure/service/code.service'
import TYPES from './types'
import type { Container } from 'inversify'
import { ActionRepository } from '@/action/infrastructure/repository/action.repository'
import { SetupActionUseCase } from '@/action/application/use-case/setup-action.use-case'
import { RunActionUseCase } from '@/action/application/use-case/run-action.use-case'

export function registerActionDependencies(
  container: Container,
  externals: Record<string, unknown> = {}
) {
  // Register use cases
  container.bind<SetupActionUseCase>(TYPES.UseCase.Setup).to(SetupActionUseCase).inSingletonScope()
  container.bind<RunActionUseCase>(TYPES.UseCase.Run).to(RunActionUseCase).inSingletonScope()

  // Register repositories
  container.bind<IActionRepository>(TYPES.Repository).to(ActionRepository).inSingletonScope()

  // Register services
  container.bind<CodeService>(TYPES.Service.Code).toConstantValue(new CodeService(externals))

  return container
}
