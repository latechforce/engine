import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import { CodeService } from '../service/code.service'
import TYPES from '../../application/di/types'
import type { Container } from 'inversify'
import { ActionRepository } from '../repository/action.repository'
import { SetupActionUseCase } from '../../application/use-case/setup-action.use-case'
import { RunActionUseCase } from '../../application/use-case/run-action.use-case'
import { RunFilterUseCase } from '../../application/use-case/run-filter.use-case'

export function registerActionDependencies(
  container: Container,
  externals: Record<string, unknown> = {}
) {
  // Register use cases
  container.bind<SetupActionUseCase>(TYPES.UseCase.Setup).to(SetupActionUseCase).inSingletonScope()
  container.bind<RunActionUseCase>(TYPES.UseCase.Run).to(RunActionUseCase).inSingletonScope()
  container.bind<RunFilterUseCase>(TYPES.UseCase.RunFilter).to(RunFilterUseCase).inSingletonScope()

  // Register repositories
  container.bind<IActionRepository>(TYPES.Repository).to(ActionRepository).inSingletonScope()

  // Register services
  container.bind<CodeService>(TYPES.Service.Code).toConstantValue(new CodeService(externals))

  return container
}
