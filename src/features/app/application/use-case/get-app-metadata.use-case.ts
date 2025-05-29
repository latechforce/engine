import { injectable } from 'inversify'
import { toAppMetadataDto, type AppMetadataDto } from '../dto/metadata.dto'
import type { App } from '../../domain/entity/app.entity'

@injectable()
export class GetAppMetadataUseCase {
  constructor() {}

  async execute(app: App): Promise<AppMetadataDto> {
    return toAppMetadataDto(app)
  }
}
