import { Container } from 'inversify'
import TYPES from '../../application/di/types'
import { SetupTableUseCase } from '@/table/application/use-case/setup-table.use-case'
import { TableHonoContext } from './context'
import type { ITableRepository } from '@/table/domain/repository-interface/table-repository.interface'
import { TableRepository } from '../repository/table.repository'

export function registerTableDependencies(container: Container) {
  // Register repositories
  container.bind<ITableRepository>(TYPES.Repository).to(TableRepository).inSingletonScope()

  // Register use cases
  container.bind<SetupTableUseCase>(TYPES.UseCase.Setup).to(SetupTableUseCase).inSingletonScope()

  // Register context
  container.bind<TableHonoContext>(TYPES.HonoContext).to(TableHonoContext).inSingletonScope()

  return container
}
