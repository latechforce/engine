// Third-party imports
import { injectable, inject } from 'inversify'

// Automation domain imports
import type { Automation } from '@/automation/domain/entity/automation.entity'

// Trigger domain imports
import type { ITriggerRepository } from '@/trigger/domain/repository-interface/trigger-repository.interface'
import { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'

// Trigger application imports
import TYPES from '../di/types'

@injectable()
export class SetupTriggerUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly triggerRepository: ITriggerRepository
  ) {}

  async execute(automation: Automation) {
    this.triggerRepository.debug(`setup trigger for "${automation.schema.name}"`)
    const { trigger } = automation
    if (trigger instanceof IntegrationTrigger) {
      await this.triggerRepository.setupIntegration(trigger)
    }
  }
}
