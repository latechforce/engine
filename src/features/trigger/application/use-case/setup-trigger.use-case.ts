import TYPES from '@/shared/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { ITriggerRepository } from '@/trigger/domain/repository-interface/trigger-repository.interface'
import type { Automation } from '@/automation/domain/entity/automation.entity'
import { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'

@injectable()
export class SetupTriggerUseCase {
  constructor(
    @inject(TYPES.Trigger.Repository)
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
