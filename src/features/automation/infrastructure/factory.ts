import { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'
import type { LoggerService } from '../../../shared/infrastructure/service/logger.service'
import type { ServerService } from '../../../shared/infrastructure/service/server.service'
import type { EmailService } from '../../../shared/infrastructure/service/email.service'
import type { EnvService } from '../../../shared/infrastructure/service/env.service'

// Infrastructure
import { AutomationRepository } from './repository/automation.repository'
import { AutomationDatabaseService } from './service/database.service'

// Use Cases
import { SetupAutomationUseCase } from '../application/use-case/setup-automation.use-case'
import { RunAutomationUseCase } from '../application/use-case/run-automation.use-case'
import { ListAutomationsUseCase } from '../application/use-case/list-automations.use-case'
import { SetStatusUseCase } from '../application/use-case/set-status.use-case'
import { GetAutomationUseCase } from '../application/use-case/get-automation.use-case'

// Context
import { AutomationHonoContext } from './di/context'

// Dependencies
import type { RunActionUseCase } from '../../action/application/use-case/run-action.use-case'
import type { IRunRepository } from '../../run/domain/repository-interface/run-repository.interface'
import type { DatabaseService } from '../../../shared/infrastructure/service/database.service'
import type { SetupTriggerUseCase } from '../../trigger/application/use-case/setup-trigger.use-case'
import type { SetupActionUseCase } from '../../action/application/use-case/setup-action.use-case'

export interface AutomationServices {
  repositories: {
    automation: AutomationRepository
  }
  useCases: {
    setup: SetupAutomationUseCase
    run: RunAutomationUseCase
    list: ListAutomationsUseCase
    setStatus: SetStatusUseCase
    getAutomation: GetAutomationUseCase
  }
  services: {
    database: AutomationDatabaseService
  }
  context: AutomationHonoContext
}

export function createAutomationRepository(container: SimpleContainer): AutomationRepository {
  // Get shared services from container
  const logger = container.get<LoggerService>('logger')
  const server = container.get<ServerService>('server')
  const email = container.get<EmailService>('email')
  const env = container.get<EnvService>('env')
  const database = container.get<DatabaseService>('database')

  // Create database service
  const automationDatabase = new AutomationDatabaseService(database)

  // Create repository
  const automationRepository = new AutomationRepository(
    logger,
    server,
    automationDatabase,
    email,
    env
  )

  // Store in container for other features
  container.set('automationRepository', automationRepository)

  return automationRepository
}

export function createAutomationServices(container: SimpleContainer): AutomationServices {
  // Get repository from container (created in first phase)
  const automationRepository = container.get<AutomationRepository>('automationRepository')

  // Get dependencies from container
  const runActionUseCase = container.get<RunActionUseCase>('runActionUseCase')
  const runRepository = container.get<IRunRepository>('runRepository')

  // Get database service for return interface
  const database = container.get<DatabaseService>('database')
  const automationDatabase = new AutomationDatabaseService(database)

  // Create use cases with dependencies from container (feature temporarily disabled)
  const setupTriggerUseCase = container.get<SetupTriggerUseCase>('setupTriggerUseCase')
  const setupActionUseCase = container.get<SetupActionUseCase>('setupActionUseCase')
  const runUseCase = new RunAutomationUseCase(automationRepository, runRepository, runActionUseCase)
  const setupUseCase = new SetupAutomationUseCase(
    runRepository,
    setupTriggerUseCase,
    setupActionUseCase,
    runUseCase,
    automationRepository
  )
  const listUseCase = new ListAutomationsUseCase(automationRepository)
  const setStatusUseCase = new SetStatusUseCase(automationRepository, setupTriggerUseCase)
  const getAutomationUseCase = new GetAutomationUseCase(automationRepository, runRepository)

  // Store use cases in container for other features
  container.set('setupAutomationUseCase', setupUseCase)

  // Create context
  const context = new AutomationHonoContext(listUseCase, setStatusUseCase, getAutomationUseCase)

  return {
    repositories: {
      automation: automationRepository,
    },
    useCases: {
      setup: setupUseCase,
      run: runUseCase,
      list: listUseCase,
      setStatus: setStatusUseCase,
      getAutomation: getAutomationUseCase,
    },
    services: {
      database: automationDatabase,
    },
    context,
  }
}
