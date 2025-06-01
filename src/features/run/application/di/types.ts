const TYPES = {
  HonoContext: Symbol.for('RunHonoContext'),
  Repository: Symbol.for('IRunRepository'),
  UseCase: {
    ListRuns: Symbol.for('ListRunsUseCase'),
    GetRun: Symbol.for('GetRunUseCase'),
  },
  Service: {
    Database: Symbol.for('RunDatabaseService'),
  },
}

export default TYPES
