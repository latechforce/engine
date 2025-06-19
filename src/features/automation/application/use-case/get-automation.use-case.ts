import { inject, injectable } from 'inversify'
import type { App } from '../../../app/domain/entity/app.entity'
import TYPES from '../../../../shared/application/di/types'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'
import { toGetAutomationDto, type GetAutomationDto } from '../dto/get-automation.dto'
import type { IRunRepository } from '../../../run/domain/repository-interface/run-repository.interface'

@injectable()
export class GetAutomationUseCase {
  constructor(
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(app: App, automationId: string): Promise<GetAutomationDto> {
    const automation = app.findAutomation(automationId)
    if (!automation) {
      throw new Error('Automation not found')
    }
    const status = await this.automationRepository.status.get(automation.schema.id)
    if (!status) {
      throw new Error('Automation status not found')
    }
    const runs = await this.runRepository.listByAutomationId(automation.schema.id)
    return toGetAutomationDto(automation, status, runs)
  }
}
