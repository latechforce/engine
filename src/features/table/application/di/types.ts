const TYPES = {
  HonoContext: Symbol.for('TableHonoContext'),
  Repository: {
    Table: Symbol.for('ITableRepository'),
    Record: Symbol.for('IRecordRepository'),
  },
  UseCase: {
    Setup: Symbol.for('SetupTableUseCase'),
    CreateRecord: Symbol.for('CreateTableRecordUseCase'),
  },
  Service: {
    Database: Symbol.for('TableDatabaseService'),
  },
}

export default TYPES
