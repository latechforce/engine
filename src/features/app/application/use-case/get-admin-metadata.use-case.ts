import { inject, injectable } from 'inversify'
import { toGetAdminMetadataDto, type GetAdminMetadataDto } from '../dto/get-admin-metadata.dto'
import type { App } from '../../domain/entity/app.entity'
import type { IAutomationRepository } from '../../../../features/automation/domain/repository-interface/automation-repository.interface'
import TYPES from '../../../../features/automation/application/di/types'

@injectable()
export class GetAdminMetadataUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(app: App): Promise<GetAdminMetadataDto> {
    const status = await this.automationRepository.status.listByIds(
      app.automations.map((a) => a.schema.id)
    )
    return toGetAdminMetadataDto(app, status)
  }
}
