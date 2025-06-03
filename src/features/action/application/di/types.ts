const TYPES = {
  Repository: Symbol.for('IActionRepository'),
  UseCase: {
    Setup: Symbol.for('SetupActionUseCase'),
    Run: Symbol.for('RunActionUseCase'),
    RunFilter: Symbol.for('RunFilterUseCase'),
  },
  Service: {
    Code: Symbol.for('CodeService'),
    Template: Symbol.for('TemplateService'),
  },
}

export default TYPES
