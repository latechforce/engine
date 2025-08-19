import { inject, injectable } from 'inversify'
import type { App } from '../../../app/domain/entity/app.entity'
import TYPES from '../../../../shared/application/di/types'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { SetupTriggerUseCase } from '../../../../features/trigger/application/use-case/setup-trigger.use-case'

@injectable()
export class SetStatusUseCase {
  constructor(
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository,
    @inject(TYPES.Trigger.UseCase.Setup)
    private readonly setupTriggerUseCase: SetupTriggerUseCase
  ) {}

  async execute(
    app: App,
    automationId: string,
    active: boolean
  ): Promise<undefined | { error: string }> {
    const automation = app.findAutomation(automationId)
    if (!automation) {
      throw new HttpError('Automation not found', 404)
    }
    await this.automationRepository.status.setActive(automation.schema.id, active)
    if (active === true) {
      const result = await this.setupTriggerUseCase.execute(app, automation)
      if (result?.error) {
        return { error: result.error }
      }
    }
  }
}
