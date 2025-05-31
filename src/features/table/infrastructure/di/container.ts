import { Container } from 'inversify'
import TYPES from '../../application/di/types'
import { SetupTableUseCase } from '@/table/application/use-case/setup-table.use-case'
import { TableHonoContext } from './context'
import type { ITableRepository } from '@/table/domain/repository-interface/table-repository.interface'
import { TableRepository } from '../repository/table.repository'
import { CreateTableRecordUseCase } from '@/table/application/use-case/create-table-record.use-case'
import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import { RecordRepository } from '../repository/record.repository'
import { TableDatabaseService } from '../service/database.service'
import { ReadTableRecordUseCase } from '@/table/application/use-case/read-table-record.use-case'
import { ListTableRecordsUseCase } from '@/table/application/use-case/list-table-records.use-case'
import { UpdateTableRecordUseCase } from '@/table/application/use-case/update-table-record.use-case'
import { UpdateMultipleTableRecordsUseCase } from '@/table/application/use-case/update-multiple-table-records.use-case'

export function registerTableDependencies(container: Container) {
  // Register repositories
  container.bind<ITableRepository>(TYPES.Repository.Table).to(TableRepository).inSingletonScope()
  container.bind<IRecordRepository>(TYPES.Repository.Record).to(RecordRepository).inSingletonScope()

  // Register use cases
  container.bind<SetupTableUseCase>(TYPES.UseCase.Setup).to(SetupTableUseCase).inSingletonScope()
  container
    .bind<CreateTableRecordUseCase>(TYPES.UseCase.CreateRecord)
    .to(CreateTableRecordUseCase)
    .inSingletonScope()
  container
    .bind<ReadTableRecordUseCase>(TYPES.UseCase.ReadRecord)
    .to(ReadTableRecordUseCase)
    .inSingletonScope()
  container
    .bind<ListTableRecordsUseCase>(TYPES.UseCase.ListRecords)
    .to(ListTableRecordsUseCase)
    .inSingletonScope()
  container
    .bind<UpdateTableRecordUseCase>(TYPES.UseCase.UpdateRecord)
    .to(UpdateTableRecordUseCase)
    .inSingletonScope()
  container
    .bind<UpdateMultipleTableRecordsUseCase>(TYPES.UseCase.UpdateMultipleRecords)
    .to(UpdateMultipleTableRecordsUseCase)
    .inSingletonScope()

  // Register services
  container
    .bind<TableDatabaseService>(TYPES.Service.Database)
    .to(TableDatabaseService)
    .inSingletonScope()

  // Register context
  container.bind<TableHonoContext>(TYPES.HonoContext).to(TableHonoContext).inSingletonScope()

  return container
}
