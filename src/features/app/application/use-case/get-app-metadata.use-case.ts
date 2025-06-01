import { injectable } from 'inversify'
import { toGetAppMetadataDto, type GetAppMetadataDto } from '../dto/get-app-metadata.dto'
import type { App } from '../../domain/entity/app.entity'

@injectable()
export class GetAppMetadataUseCase {
  constructor() {}

  async execute(app: App): Promise<GetAppMetadataDto> {
    return toGetAppMetadataDto(app)
  }
}
