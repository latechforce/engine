const TYPES = {
  HonoContext: Symbol.for('TableHonoContext'),
  Repository: {
    Table: Symbol.for('ITableRepository'),
    Record: Symbol.for('IRecordRepository'),
  },
  UseCase: {
    Setup: Symbol.for('SetupTableUseCase'),
    CreateRecord: Symbol.for('CreateTableRecordUseCase'),
    ReadRecord: Symbol.for('ReadTableRecordUseCase'),
    ListRecords: Symbol.for('ListTableRecordsUseCase'),
    UpdateRecord: Symbol.for('UpdateTableRecordUseCase'),
    UpdateMultipleRecords: Symbol.for('UpdateMultipleTableRecordsUseCase'),
    DeleteRecord: Symbol.for('DeleteTableRecordUseCase'),
    DeleteMultipleRecords: Symbol.for('DeleteMultipleTableRecordsUseCase'),
  },
  Service: {
    Database: Symbol.for('TableDatabaseService'),
  },
}

export default TYPES
