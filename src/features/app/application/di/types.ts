const TYPES = {
  HonoContext: Symbol.for('AppHonoContext'),
  Repository: Symbol.for('IAppRepository'),
  UseCase: {
    Start: Symbol.for('StartAppUseCase'),
    GetMetadata: Symbol.for('GetAppMetadataUseCase'),
    Validate: Symbol.for('ValidateAppUseCase'),
    Mock: Symbol.for('MockAppUseCase'),
  },
  Controller: Symbol.for('AppController'),
  Service: {
    Mock: Symbol.for('MockService'),
  },
}

export default TYPES
