import { Container } from 'inversify'
import TYPES from './types'
import { ListRunsUseCase } from '@/run/application/use-case/list-runs.use-case'
import { RunHonoContext } from './context'
import { GetRunUseCase } from '@/run/application/use-case/get-run.use-case'
import { RunDatabaseService } from '../service/database.service'
import { RunRepository } from '../repository/run.repository'
import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'

export function registerRunDependencies(container: Container) {
  // Register repositories
  container.bind<IRunRepository>(TYPES.Repository).to(RunRepository).inSingletonScope()

  // Register use cases
  container.bind<ListRunsUseCase>(TYPES.UseCase.ListRuns).to(ListRunsUseCase).inSingletonScope()
  container.bind<GetRunUseCase>(TYPES.UseCase.GetRun).to(GetRunUseCase).inSingletonScope()

  // Register services
  container
    .bind<RunDatabaseService>(TYPES.Service.Database)
    .to(RunDatabaseService)
    .inSingletonScope()

  // Register context
  container.bind<RunHonoContext>(TYPES.HonoContext).to(RunHonoContext).inSingletonScope()

  return container
}
