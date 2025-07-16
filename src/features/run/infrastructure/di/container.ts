import { Container } from 'inversify'
import TYPES from '../../application/di/types'
import { ListRunsUseCase } from '../../application/use-case/list-runs.use-case'
import { RunHonoContext } from './context'
import { GetRunUseCase } from '../../application/use-case/get-run.use-case'
import { RunDatabaseService } from '../service/database.service'
import { RunRepository } from '../repository/run.repository'
import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { ReplayRunsUseCase } from '../../application/use-case/replay-runs.use-case'

export function registerRunDependencies(container: Container) {
  // Register repositories
  container.bind<IRunRepository>(TYPES.Repository).to(RunRepository).inSingletonScope()

  // Register use cases
  container.bind<ListRunsUseCase>(TYPES.UseCase.ListRuns).to(ListRunsUseCase).inSingletonScope()
  container.bind<GetRunUseCase>(TYPES.UseCase.GetRun).to(GetRunUseCase).inSingletonScope()
  container
    .bind<ReplayRunsUseCase>(TYPES.UseCase.ReplayRuns)
    .to(ReplayRunsUseCase)
    .inSingletonScope()

  // Register services
  container
    .bind<RunDatabaseService>(TYPES.Service.Database)
    .to(RunDatabaseService)
    .inSingletonScope()

  // Register context
  container.bind<RunHonoContext>(TYPES.HonoContext).to(RunHonoContext).inSingletonScope()

  return container
}
