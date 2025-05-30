const TYPES = {
  HonoContext: Symbol.for('AppHonoContext'),
  Repository: Symbol.for('IAppRepository'),
  UseCase: {
    Start: Symbol.for('StartAppUseCase'),
    GetMetadata: Symbol.for('GetAppMetadataUseCase'),
    Validate: Symbol.for('ValidateAppUseCase'),
    Mock: Symbol.for('MockAppUseCase'),
  },
}

export default TYPES
