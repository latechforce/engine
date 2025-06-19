import { injectable } from 'inversify'
import { toGetAdminMetadataDto, type GetAdminMetadataDto } from '../dto/get-admin-metadata.dto'
import type { App } from '../../domain/entity/app.entity'

@injectable()
export class GetAdminMetadataUseCase {
  constructor() {}

  async execute(app: App): Promise<GetAdminMetadataDto> {
    return toGetAdminMetadataDto(app)
  }
}
