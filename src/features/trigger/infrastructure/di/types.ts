const TYPES = {
  HonoContext: Symbol.for('TriggerHonoContext'),
  Repository: Symbol.for('ITriggerRepository'),
  UseCase: {
    Http: Symbol.for('HttpTriggeredUseCase'),
    Setup: Symbol.for('SetupTriggerUseCase'),
  },
}

export default TYPES
