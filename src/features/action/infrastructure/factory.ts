import { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'
import type { LoggerService } from '../../../shared/infrastructure/service/logger.service'
import type { TemplateService } from '../../../shared/infrastructure/service/template.service'

// Infrastructure
import { ActionRepository } from './repository/action.repository'
import { CodeService } from './service/code.service'
import { QueueService } from './service/queue.service'

// Use Cases
import { RunActionUseCase } from '../application/use-case/run-action.use-case'
import { SetupActionUseCase } from '../application/use-case/setup-action.use-case'
import { RunFilterUseCase } from '../application/use-case/run-filter.use-case'

// Dependencies
import type { IRecordRepository } from '../../table/domain/repository-interface/record-repository.interface'
import type { IObjectRepository } from '../../bucket/domain/repository-interface/object-repository.interface'
import type { IConnectionRepository } from '../../connection/domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '../../connection/domain/repository-interface/token-repository.interface'
import type { RunRepository } from '../../run/infrastructure/repository/run.repository'

export interface ActionServices {
  repositories: {
    action: ActionRepository
  }
  useCases: {
    run: RunActionUseCase
    setup: SetupActionUseCase
    runFilter: RunFilterUseCase
  }
  services: {
    code: CodeService
    queue: QueueService
  }
}

export function createActionServices(
  container: SimpleContainer,
  externals: Record<string, unknown> = {}
): ActionServices {
  // Get shared services from container
  const logger = container.get<LoggerService>('logger')
  const template = container.get<TemplateService>('template')

  // Get dependencies from container
  const recordRepository = container.get<IRecordRepository>('recordRepository')
  const objectRepository = container.get<IObjectRepository>('objectRepository')
  const connectionRepository = container.get<IConnectionRepository>('connectionRepository')
  const tokenRepository = container.get<ITokenRepository>('tokenRepository')

  // Create services
  const codeService = new CodeService(externals)
  const queueService = new QueueService()

  // Create repositories
  const actionRepository = new ActionRepository(
    codeService,
    template,
    logger,
    recordRepository,
    objectRepository,
    connectionRepository,
    tokenRepository,
    queueService
  )

  // Create use cases
  const runFilterUseCase = new RunFilterUseCase()
  const runRepository = container.get<RunRepository>('runRepository')
  const runUseCase = new RunActionUseCase(actionRepository, runFilterUseCase, runRepository)
  const setupUseCase = new SetupActionUseCase(actionRepository)

  // Store use cases in container for other features
  container.set('runActionUseCase', runUseCase)
  container.set('setupActionUseCase', setupUseCase)

  return {
    repositories: {
      action: actionRepository,
    },
    useCases: {
      run: runUseCase,
      setup: setupUseCase,
      runFilter: runFilterUseCase,
    },
    services: {
      code: codeService,
      queue: queueService,
    },
  }
}
