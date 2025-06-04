// Third-party imports
import { inject, injectable } from 'inversify'
import type { Context } from 'hono'

// Connection application imports
import type { ListConnectionsUseCase } from '../../application/use-case/list-connections.use-case'
import type { AuthenticateConnectionUseCase } from '../../application/use-case/authenticate-connection.use-case'
import TYPES from '../../application/di/types'

export type ConnectionHonoContextType = {
  listConnectionsUseCase: ListConnectionsUseCase
  authenticateConnectionUseCase: AuthenticateConnectionUseCase
}

@injectable()
export class ConnectionHonoContext {
  constructor(
    @inject(TYPES.UseCase.List)
    private readonly listConnectionsUseCase: ListConnectionsUseCase,
    @inject(TYPES.UseCase.Authenticate)
    private readonly authenticateConnectionUseCase: AuthenticateConnectionUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listConnectionsUseCase', this.listConnectionsUseCase)
    c.set('authenticateConnectionUseCase', this.authenticateConnectionUseCase)
  }
}
