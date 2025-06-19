// Types
import type { App } from '../../domain/entity/app.entity'
import type { Context } from 'hono'
import type { HonoType } from '../routes'
import type { ValidateResult } from '../../domain/value-object/validate-result.value-object'

// Dependencies
import { inject } from 'inversify'

// Local imports
import TYPES from '../../../../shared/application/di/types'
import type { StartAppUseCase } from '../../application/use-case/start-app.use-case'
import type { ValidateAppUseCase } from '../../application/use-case/validate-app.use-case'

export class AppController {
  constructor(
    @inject(TYPES.App.UseCase.Validate)
    private readonly validateAppUseCase: ValidateAppUseCase,
    @inject(TYPES.App.UseCase.Start)
    private readonly startAppUseCase: StartAppUseCase
  ) {}

  validate(unknownSchema: unknown): Promise<ValidateResult> {
    return this.validateAppUseCase.execute(unknownSchema)
  }

  async start(unknownSchema: unknown): Promise<App> {
    return this.startAppUseCase.execute(unknownSchema)
  }

  static async appMetadata(c: Context<HonoType>) {
    const app = c.get('app')
    const getAppMetadataUseCase = c.get('getAppMetadataUseCase')
    const getAppMetadataDto = await getAppMetadataUseCase.execute(app)
    return c.json(getAppMetadataDto)
  }

  static async adminMetadata(c: Context<HonoType>) {
    const app = c.get('app')
    const getAdminMetadataUseCase = c.get('getAdminMetadataUseCase')
    const getAdminMetadataDto = await getAdminMetadataUseCase.execute(app)
    return c.json(getAdminMetadataDto)
  }
}
