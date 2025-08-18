const TYPES = {
  HonoContext: Symbol.for('ConnectionHonoContext'),
  Repository: {
    Connection: Symbol.for('IConnectionRepository'),
    Token: Symbol.for('ITokenRepository'),
  },
  UseCase: {
    List: Symbol.for('ListConnectionsUseCase'),
    Authenticate: Symbol.for('AuthenticateConnectionUseCase'),
    Setup: Symbol.for('SetupConnectionUseCase'),
    Disconnect: Symbol.for('DisconnectConnectionUseCase'),
  },
  Service: {
    Database: Symbol.for('ConnectionDatabaseService'),
  },
}

export default TYPES
