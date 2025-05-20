const TYPES = {
  Service: {
    Env: Symbol.for('EnvService'),
    Logger: Symbol.for('LoggerService'),
    Server: Symbol.for('ServerService'),
    Database: Symbol.for('DatabaseService'),
    Auth: Symbol.for('AuthService'),
    Code: Symbol.for('CodeService'),
    Template: Symbol.for('TemplateService'),
  },
  Repository: {
    App: Symbol.for('IAppRepository'),
    Admin: Symbol.for('IAdminRepository'),
    Automation: Symbol.for('IAutomationRepository'),
    Trigger: Symbol.for('ITriggerRepository'),
    Action: Symbol.for('IActionRepository'),
    Run: Symbol.for('IRunRepository'),
    Table: Symbol.for('ITableRepository'),
    Field: Symbol.for('IFieldRepository'),
  },
  UseCase: {
    StartApp: Symbol.for('StartAppUseCase'),
    SetupAdmin: Symbol.for('SetupAdminUseCase'),
    SetupAutomation: Symbol.for('SetupAutomationUseCase'),
    SetupTrigger: Symbol.for('SetupTriggerUseCase'),
    SetupAction: Symbol.for('SetupActionUseCase'),
    RunAutomation: Symbol.for('RunAutomationUseCase'),
    RunAction: Symbol.for('RunActionUseCase'),
    SetupTable: Symbol.for('SetupTableUseCase'),
    SetupField: Symbol.for('SetupFieldUseCase'),
    ListRuns: Symbol.for('ListRunsUseCase'),
    TriggerHttp: Symbol.for('TriggerHttpUseCase'),
    ValidateApp: Symbol.for('ValidateAppUseCase'),
  },
}

export default TYPES
