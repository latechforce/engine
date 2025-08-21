import { toGetAdminMetadataDto, type GetAdminMetadataDto } from '../dto/get-admin-metadata.dto'
import type { App } from '../../domain/entity/app.entity'
import type { IAutomationRepository } from '../../../../features/automation/domain/repository-interface/automation-repository.interface'

export class GetAdminMetadataUseCase {
  constructor(private readonly automationRepository: IAutomationRepository) {}

  async execute(app: App): Promise<GetAdminMetadataDto> {
    const status = await this.automationRepository.status.listByIds(
      app.automations.map((a) => a.schema.id)
    )
    return toGetAdminMetadataDto(app, status)
  }
}
