const TYPES = {
  HonoContext: Symbol.for('TableHonoContext'),
  Repository: {
    Table: Symbol.for('ITableRepository'),
    Record: Symbol.for('IRecordRepository'),
  },
  UseCase: {
    Setup: Symbol.for('SetupTableUseCase'),
    CreateRecord: Symbol.for('CreateRecordUseCase'),
    ReadRecord: Symbol.for('ReadRecordUseCase'),
    ListRecords: Symbol.for('ListRecordsUseCase'),
    UpdateRecord: Symbol.for('UpdateRecordUseCase'),
    UpdateMultipleRecords: Symbol.for('UpdateMultipleRecordsUseCase'),
    DeleteRecord: Symbol.for('DeleteRecordUseCase'),
    DeleteMultipleRecords: Symbol.for('DeleteMultipleRecordsUseCase'),
    List: Symbol.for('ListTablesUseCase'),
  },
  Service: {
    Database: Symbol.for('TableDatabaseService'),
  },
}

export default TYPES
