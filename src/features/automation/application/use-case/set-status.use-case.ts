import { inject, injectable } from 'inversify'
import type { App } from '../../../app/domain/entity/app.entity'
import TYPES from '../di/types'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'

@injectable()
export class SetStatusUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(app: App, automationId: string, active: boolean): Promise<void> {
    const automation = app.findAutomation(automationId)
    if (!automation) {
      throw new HttpError('Automation not found', 404)
    }
    await this.automationRepository.status.setActive(automation.schema.id, active)
  }
}
