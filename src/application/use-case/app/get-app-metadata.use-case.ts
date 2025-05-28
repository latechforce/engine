import { injectable } from 'inversify'
import { toMetadataDto } from '@/application/dto/metadata.dto'
import type { App } from '@/domain/entity/app.entity'
import type { MetadataDto } from '@/application/dto/metadata.dto'

@injectable()
export class GetAppMetadataUseCase {
  constructor() {}

  async execute(app: App): Promise<MetadataDto> {
    return toMetadataDto(app)
  }
}
