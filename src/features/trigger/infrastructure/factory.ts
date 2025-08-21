import { SimpleContainer } from '../../../shared/infrastructure/di/simple-container'
import type { LoggerService } from '../../../shared/infrastructure/service/logger.service'
import type { SchemaService } from '../../../shared/infrastructure/service/validator.service'
import type { TemplateService } from '../../../shared/infrastructure/service/template.service'
import type { EnvService } from '../../../shared/infrastructure/service/env.service'

// Infrastructure
import { TriggerRepository } from './repository/trigger.repository'

// Use Cases
import { SetupTriggerUseCase } from '../application/use-case/setup-trigger.use-case'
import { TriggerHttpAutomationUseCase } from '../application/use-case/trigger-http-automation.use-case'

// Context
import { TriggerHonoContext } from './di/context'

// Dependencies
import type { ITokenRepository } from '../../connection/domain/repository-interface/token-repository.interface'
import type { RunRepository } from '../../run/infrastructure/repository/run.repository'
import type { IRecordRepository } from '../../table/domain/repository-interface/record-repository.interface'
import type { AutomationRepository } from '../../automation/infrastructure/repository/automation.repository'
import type { IObjectRepository } from '../../bucket/domain/repository-interface/object-repository.interface'

export interface TriggerServices {
  repositories: {
    trigger: TriggerRepository
  }
  useCases: {
    setup: SetupTriggerUseCase
    triggerHttpAutomation: TriggerHttpAutomationUseCase
  }
  context: TriggerHonoContext
}

export function createTriggerServices(container: SimpleContainer): TriggerServices {
  // Get shared services from container
  const logger = container.get<LoggerService>('logger')
  const validator = container.get<SchemaService>('validator')
  const template = container.get<TemplateService>('template')
  const env = container.get<EnvService>('env')

  // Get dependencies from container
  const tokenRepository = container.get<ITokenRepository>('tokenRepository')

  // Create repositories
  const triggerRepository = new TriggerRepository(logger, validator, template, tokenRepository, env)
  const recordRepository = container.get<IRecordRepository>('recordRepository')
  const automationRepository = container.get<AutomationRepository>('automationRepository')
  const objectRepository = container.get<IObjectRepository>('objectRepository')

  // Create use cases
  const runRepository = container.get<RunRepository>('runRepository')
  const setupUseCase = new SetupTriggerUseCase(
    triggerRepository,
    runRepository,
    recordRepository,
    automationRepository
  )
  const triggerHttpAutomationUseCase = new TriggerHttpAutomationUseCase(
    triggerRepository,
    runRepository,
    objectRepository,
    automationRepository
  )

  // Store use cases in container for other features
  container.set('setupTriggerUseCase', setupUseCase)

  // Create context
  const context = new TriggerHonoContext(triggerHttpAutomationUseCase)

  return {
    repositories: {
      trigger: triggerRepository,
    },
    useCases: {
      setup: setupUseCase,
      triggerHttpAutomation: triggerHttpAutomationUseCase,
    },
    context,
  }
}
