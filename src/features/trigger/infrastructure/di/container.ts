// Third-party imports
import { Container } from 'inversify'

// Trigger domain imports
import type { ITriggerRepository } from '@/trigger/domain/repository-interface/trigger-repository.interface'

// Trigger application imports
import TYPES from '../../application/di/types'
import { SetupTriggerUseCase } from '@/trigger/application/use-case/setup-trigger.use-case'
import { HttpTriggeredUseCase } from '@/trigger/application/use-case/http-triggered.use-case'

// Trigger infrastructure imports
import { TriggerRepository } from '../repository/trigger.repository'
import { TriggerHonoContext } from './context'

export function registerTriggerDependencies(container: Container) {
  // Register repositories
  container.bind<ITriggerRepository>(TYPES.Repository).to(TriggerRepository).inSingletonScope()

  // Register use cases
  container
    .bind<SetupTriggerUseCase>(TYPES.UseCase.Setup)
    .to(SetupTriggerUseCase)
    .inSingletonScope()
  container
    .bind<HttpTriggeredUseCase>(TYPES.UseCase.Http)
    .to(HttpTriggeredUseCase)
    .inSingletonScope()

  // Register context
  container.bind<TriggerHonoContext>(TYPES.HonoContext).to(TriggerHonoContext).inSingletonScope()

  return container
}
