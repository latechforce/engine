import type { App } from '../../../../features/app/domain/entity/app.entity'
import { toListAutomationsDto, type ListAutomationsDto } from '../dto/list-automations.dto'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'

export class ListAutomationsUseCase {
  constructor(private readonly automationRepository: IAutomationRepository) {}

  async execute(app: App): Promise<ListAutomationsDto> {
    const status = await this.automationRepository.status.listByIds(
      app.automations.map((a) => a.schema.id)
    )
    return toListAutomationsDto(app.automations, status)
  }
}
