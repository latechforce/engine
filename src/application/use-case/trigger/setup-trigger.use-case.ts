import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { ITriggerRepository } from '@/domain/repository-interface/trigger-repository.interface'
import type { Automation } from '@/domain/entity/automation.entity'
import { IntegrationTrigger } from '@/domain/entity/trigger/integration-trigger.entity'

@injectable()
export class SetupTriggerUseCase {
  constructor(
    @inject(TYPES.Repository.Trigger)
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
