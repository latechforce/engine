import { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'
import type { LoggerService } from '../../../shared/infrastructure/service/logger.service'
import type { ServerService } from '../../../shared/infrastructure/service/server.service'
import type { DatabaseService } from '../../../shared/infrastructure/service/database.service'
import type { SchemaService } from '../../../shared/infrastructure/service/validator.service'
import type { IObjectRepository } from '../../bucket/domain/repository-interface/object-repository.interface'
import type { IDomainEventPublisher } from '../../../shared/domain/event/domain-event-publisher.interface'

// Infrastructure
import { TableRepository } from './repository/table.repository'
import { RecordRepository } from './repository/record.repository'
import { TableDatabaseService } from './service/database.service'

// Use Cases
import { CreateRecordUseCase } from '../application/use-case/create-record.use-case'
import { ListRecordsUseCase } from '../application/use-case/list-records.use-case'
import { ReadRecordUseCase } from '../application/use-case/read-record.use-case'
import { UpdateRecordUseCase } from '../application/use-case/update-record.use-case'
import { UpdateMultipleRecordsUseCase } from '../application/use-case/update-multiple-records.use-case'
import { DeleteRecordUseCase } from '../application/use-case/delete-record.use-case'
import { DeleteMultipleRecordsUseCase } from '../application/use-case/delete-multiple-record.use-case'
import { ListTablesUseCase } from '../application/use-case/list-tables.use-case'
import { SetupTableUseCase } from '../application/use-case/setup-table.use-case'

// Context
import { TableHonoContext } from './di/context'
import { ObjectRepository } from '../../bucket/infrastructure/repository/object.repository'
import { BucketDatabaseService } from '../../bucket/infrastructure/service/database.service'

export interface TableServices {
  repositories: {
    table: TableRepository
    record: RecordRepository
  }
  useCases: {
    setup: SetupTableUseCase
    createRecord: CreateRecordUseCase
    readRecord: ReadRecordUseCase
    listRecords: ListRecordsUseCase
    updateRecord: UpdateRecordUseCase
    updateMultipleRecords: UpdateMultipleRecordsUseCase
    deleteRecord: DeleteRecordUseCase
    deleteMultipleRecords: DeleteMultipleRecordsUseCase
    listTables: ListTablesUseCase
  }
  services: {
    database: TableDatabaseService
  }
  context: TableHonoContext
}

export function createTableServices(container: SimpleContainer): TableServices {
  // Get shared services from container
  const logger = container.get<LoggerService>('logger')
  const server = container.get<ServerService>('server')
  const validator = container.get<SchemaService>('validator')
  const databaseService = container.get<DatabaseService>('database')
  const eventPublisher = container.get<IDomainEventPublisher>('eventPublisher')

  // Create database service
  const database = new TableDatabaseService(databaseService)
  const bucketDatabase = new BucketDatabaseService(databaseService)

  // Create repositories
  const tableRepository = new TableRepository(logger, server, database)
  const recordRepository = new RecordRepository(validator, database)
  const objectRepository = new ObjectRepository(bucketDatabase)

  // Create use cases
  const setupUseCase = new SetupTableUseCase(tableRepository)
  const createRecordUseCase = new CreateRecordUseCase(
    recordRepository,
    objectRepository,
    eventPublisher
  )
  const readRecordUseCase = new ReadRecordUseCase(recordRepository)
  const listRecordsUseCase = new ListRecordsUseCase(recordRepository)
  const updateRecordUseCase = new UpdateRecordUseCase(
    recordRepository,
    objectRepository,
    eventPublisher
  )
  const updateMultipleRecordsUseCase = new UpdateMultipleRecordsUseCase(recordRepository)
  const deleteRecordUseCase = new DeleteRecordUseCase(recordRepository, eventPublisher)
  const deleteMultipleRecordsUseCase = new DeleteMultipleRecordsUseCase(recordRepository)
  const listTablesUseCase = new ListTablesUseCase()

  container.set('recordRepository', recordRepository)

  // Create context
  const context = new TableHonoContext(
    setupUseCase,
    createRecordUseCase,
    readRecordUseCase,
    listRecordsUseCase,
    updateRecordUseCase,
    updateMultipleRecordsUseCase,
    deleteRecordUseCase,
    deleteMultipleRecordsUseCase,
    listTablesUseCase
  )

  return {
    repositories: {
      table: tableRepository,
      record: recordRepository,
    },
    useCases: {
      setup: setupUseCase,
      createRecord: createRecordUseCase,
      readRecord: readRecordUseCase,
      listRecords: listRecordsUseCase,
      updateRecord: updateRecordUseCase,
      updateMultipleRecords: updateMultipleRecordsUseCase,
      deleteRecord: deleteRecordUseCase,
      deleteMultipleRecords: deleteMultipleRecordsUseCase,
      listTables: listTablesUseCase,
    },
    services: {
      database,
    },
    context,
  }
}

// Factory functions for individual services
export function createTableRepository(
  logger: LoggerService,
  server: ServerService,
  database: TableDatabaseService
): TableRepository {
  return new TableRepository(logger, server, database)
}

export function createRecordRepository(
  validator: SchemaService,
  database: TableDatabaseService
): RecordRepository {
  return new RecordRepository(validator, database)
}

export function createCreateRecordUseCase(
  recordRepository: RecordRepository,
  objectRepository: IObjectRepository,
  eventPublisher: IDomainEventPublisher
): CreateRecordUseCase {
  return new CreateRecordUseCase(recordRepository, objectRepository, eventPublisher)
}
