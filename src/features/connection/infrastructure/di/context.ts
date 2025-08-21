// Third-party imports
import type { Context } from 'hono'

// Connection application imports
import type { ListConnectionsUseCase } from '../../application/use-case/list-connections.use-case'
import type { AuthenticateConnectionUseCase } from '../../application/use-case/authenticate-connection.use-case'
import type { DisconnectConnectionUseCase } from '../../application/use-case/disconnect-connection.use-case'

export type ConnectionHonoContextType = {
  listConnectionsUseCase: ListConnectionsUseCase
  authenticateConnectionUseCase: AuthenticateConnectionUseCase
  disconnectConnectionUseCase: DisconnectConnectionUseCase
}

export class ConnectionHonoContext {
  constructor(
    private readonly listConnectionsUseCase: ListConnectionsUseCase,

    private readonly authenticateConnectionUseCase: AuthenticateConnectionUseCase,

    private readonly disconnectConnectionUseCase: DisconnectConnectionUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listConnectionsUseCase', this.listConnectionsUseCase)
    c.set('authenticateConnectionUseCase', this.authenticateConnectionUseCase)
    c.set('disconnectConnectionUseCase', this.disconnectConnectionUseCase)
  }
}
