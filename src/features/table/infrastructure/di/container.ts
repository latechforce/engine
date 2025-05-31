import { Container } from 'inversify'
import TYPES from '../../application/di/types'
import { SetupTableUseCase } from '@/table/application/use-case/setup-table.use-case'
import { TableHonoContext } from './context'
import type { ITableRepository } from '@/table/domain/repository-interface/table-repository.interface'
import { TableRepository } from '../repository/table.repository'
import { CreateRecordUseCase } from '@/table/application/use-case/create-record.use-case'
import type { IRecordRepository } from '@/table/domain/repository-interface/record-repository.interface'
import { RecordRepository } from '../repository/record.repository'
import { TableDatabaseService } from '../service/database.service'
import { ReadRecordUseCase } from '@/table/application/use-case/read-record.use-case'
import { ListRecordsUseCase } from '@/table/application/use-case/list-records.use-case'
import { UpdateRecordUseCase } from '@/table/application/use-case/update-record.use-case'
import { UpdateMultipleRecordsUseCase } from '@/table/application/use-case/update-multiple-records.use-case'
import { DeleteMultipleRecordsUseCase } from '@/table/application/use-case/delete-multiple-record.use-case'
import { DeleteRecordUseCase } from '@/table/application/use-case/delete-record.use-case'
import { ListTablesUseCase } from '@/table/application/use-case/list-tables.use-case'

export function registerTableDependencies(container: Container) {
  // Register repositories
  container.bind<ITableRepository>(TYPES.Repository.Table).to(TableRepository).inSingletonScope()
  container.bind<IRecordRepository>(TYPES.Repository.Record).to(RecordRepository).inSingletonScope()

  // Register use cases
  container.bind<SetupTableUseCase>(TYPES.UseCase.Setup).to(SetupTableUseCase).inSingletonScope()
  container
    .bind<CreateRecordUseCase>(TYPES.UseCase.CreateRecord)
    .to(CreateRecordUseCase)
    .inSingletonScope()
  container
    .bind<ReadRecordUseCase>(TYPES.UseCase.ReadRecord)
    .to(ReadRecordUseCase)
    .inSingletonScope()
  container
    .bind<ListRecordsUseCase>(TYPES.UseCase.ListRecords)
    .to(ListRecordsUseCase)
    .inSingletonScope()
  container
    .bind<UpdateRecordUseCase>(TYPES.UseCase.UpdateRecord)
    .to(UpdateRecordUseCase)
    .inSingletonScope()
  container
    .bind<UpdateMultipleRecordsUseCase>(TYPES.UseCase.UpdateMultipleRecords)
    .to(UpdateMultipleRecordsUseCase)
    .inSingletonScope()
  container
    .bind<DeleteMultipleRecordsUseCase>(TYPES.UseCase.DeleteMultipleRecords)
    .to(DeleteMultipleRecordsUseCase)
    .inSingletonScope()
  container
    .bind<DeleteRecordUseCase>(TYPES.UseCase.DeleteRecord)
    .to(DeleteRecordUseCase)
    .inSingletonScope()
  container.bind<ListTablesUseCase>(TYPES.UseCase.List).to(ListTablesUseCase).inSingletonScope()

  // Register services
  container
    .bind<TableDatabaseService>(TYPES.Service.Database)
    .to(TableDatabaseService)
    .inSingletonScope()

  // Register context
  container.bind<TableHonoContext>(TYPES.HonoContext).to(TableHonoContext).inSingletonScope()

  return container
}
