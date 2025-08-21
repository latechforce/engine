import { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'

// Infrastructure
import { AuthService } from './service/auth.service'

// Context
import { UserHonoContext } from './di/context'
import type { LoggerService } from '../../../shared/infrastructure/service/logger.service'
import type { DatabaseService } from '../../../shared/infrastructure/service/database.service'
import type { ServerService } from '../../../shared/infrastructure/service/server.service'
import type { EnvService } from '../../../shared/infrastructure/service/env.service'

export interface UserServices {
  services: {
    auth: AuthService
  }
  context: UserHonoContext
}

export function createUserServices(container: SimpleContainer): UserServices {
  // Get dependencies
  const env = container.get<EnvService>('env')
  const logger = container.get<LoggerService>('logger')
  const database = container.get<DatabaseService>('database')
  const server = container.get<ServerService>('server')

  // Create services
  const authService = new AuthService(env, logger, database, server)

  // Create context
  const context = new UserHonoContext(authService)

  return {
    services: {
      auth: authService,
    },
    context,
  }
}
