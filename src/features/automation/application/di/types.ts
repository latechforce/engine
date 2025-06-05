const TYPES = {
  HonoContext: Symbol.for('AutomationHonoContext'),
  Repository: Symbol.for('IAutomationRepository'),
  UseCase: {
    Setup: Symbol.for('SetupAutomationUseCase'),
    Run: Symbol.for('RunAutomationUseCase'),
    List: Symbol.for('ListAutomationsUseCase'),
  },
  Service: {
    Database: Symbol.for('AutomationDatabaseService'),
  },
}

export default TYPES
