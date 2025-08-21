import { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'
import type { DatabaseService } from '../../../shared/infrastructure/service/database.service'

// Infrastructure
import { RunRepository } from './repository/run.repository'
import { RunDatabaseService } from './service/database.service'

// Use Cases
import { GetRunUseCase } from '../application/use-case/get-run.use-case'
import { ListRunsUseCase } from '../application/use-case/list-runs.use-case'
import { ReplayRunsUseCase } from '../application/use-case/replay-runs.use-case'

// Context
import { RunHonoContext } from './di/context'
import type { LoggerService } from '../../../shared/infrastructure/service/logger.service'
import { AutomationRepository } from '../../automation/infrastructure/repository/automation.repository'
import type { ServerService } from '../../../shared/infrastructure/service/server.service'
import type { EnvService } from '../../../shared/infrastructure/service/env.service'
import { AutomationDatabaseService } from '../../automation/infrastructure/service/database.service'
import type { EmailService } from '../../../shared/infrastructure/service/email.service'

export interface RunServices {
  repositories: {
    run: RunRepository
  }
  useCases: {
    get: GetRunUseCase
    list: ListRunsUseCase
    replay: ReplayRunsUseCase
  }
  services: {
    database: RunDatabaseService
  }
  context: RunHonoContext
}

export function createRunServices(container: SimpleContainer): RunServices {
  // Get shared services from container
  const database = container.get<DatabaseService>('database')
  const logger = container.get<LoggerService>('logger')
  const server = container.get<ServerService>('server')
  const email = container.get<EmailService>('email')
  const env = container.get<EnvService>('env')

  // Create database service
  const runDatabase = new RunDatabaseService(database)
  const automationDatabase = new AutomationDatabaseService(database)

  // Create repositories
  const runRepository = new RunRepository(logger, runDatabase)
  const automationRepository = new AutomationRepository(
    logger,
    server,
    automationDatabase,
    email,
    env
  )

  // Create use cases
  const getUseCase = new GetRunUseCase(runRepository, automationRepository)
  const listUseCase = new ListRunsUseCase(runRepository)
  const replayUseCase = new ReplayRunsUseCase(runRepository)

  // Create context
  const context = new RunHonoContext(listUseCase, getUseCase, replayUseCase)

  // Store in container for other features
  container.set('runRepository', runRepository)

  return {
    repositories: {
      run: runRepository,
    },
    useCases: {
      get: getUseCase,
      list: listUseCase,
      replay: replayUseCase,
    },
    services: {
      database: runDatabase,
    },
    context,
  }
}
