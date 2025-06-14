// Third-party imports
import { Container } from 'inversify'

// Connection domain imports
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '../../domain/repository-interface/token-repository.interface'

// Connection application imports
import TYPES from '../../application/di/types'
import { ListConnectionsUseCase } from '../../application/use-case/list-connections.use-case'
import { AuthenticateConnectionUseCase } from '../../application/use-case/authenticate-connection.use-case'
import { SetupConnectionUseCase } from '../../application/use-case/setup-connection.use-case'

// Connection infrastructure imports
import { ConnectionRepository } from '../repository/connection.repository'
import { TokenRepository } from '../repository/token.repository'
import { ConnectionHonoContext } from './context'
import { ConnectionDatabaseService } from '../service/database.service'

export function registerConnectionDependencies(container: Container) {
  // Register repositories
  container
    .bind<IConnectionRepository>(TYPES.Repository.Connection)
    .to(ConnectionRepository)
    .inSingletonScope()
  container.bind<ITokenRepository>(TYPES.Repository.Token).to(TokenRepository).inSingletonScope()

  // Register use cases
  container
    .bind<ListConnectionsUseCase>(TYPES.UseCase.List)
    .to(ListConnectionsUseCase)
    .inSingletonScope()
  container
    .bind<AuthenticateConnectionUseCase>(TYPES.UseCase.Authenticate)
    .to(AuthenticateConnectionUseCase)
    .inSingletonScope()
  container
    .bind<SetupConnectionUseCase>(TYPES.UseCase.Setup)
    .to(SetupConnectionUseCase)
    .inSingletonScope()

  // Register services
  container
    .bind<ConnectionDatabaseService>(TYPES.Service.Database)
    .to(ConnectionDatabaseService)
    .inSingletonScope()

  // Register context
  container
    .bind<ConnectionHonoContext>(TYPES.HonoContext)
    .to(ConnectionHonoContext)
    .inSingletonScope()

  return container
}
