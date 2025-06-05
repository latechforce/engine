import { inject, injectable } from 'inversify'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import TYPES from '../di/types'
import { toListAutomationsDto, type ListAutomationsDto } from '../dto/list-automations.dto'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'

@injectable()
export class ListAutomationsUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(app: App): Promise<ListAutomationsDto> {
    const status = await this.automationRepository.status.listByIds(
      app.automations.map((a) => a.schema.id)
    )
    return toListAutomationsDto(app.automations, status)
  }
}
