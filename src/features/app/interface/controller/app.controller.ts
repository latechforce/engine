import type { App } from '../../domain/entity/app.entity'
import TYPES from '@/shared/application/di/types'
import { inject } from 'inversify'
import type { ValidateAppUseCase } from '../../application/use-case/validate-app.use-case'
import type { StartAppUseCase } from '../../application/use-case/start-app.use-case'
import type { ValidateResult } from '../../domain/value-object/validate-result.value-object'
import type { Context } from 'hono'
import type { HonoType } from '../routes'

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

  static async metadata(c: Context<HonoType>) {
    const app = c.get('app')
    const getAppMetadataUseCase = c.get('getAppMetadataUseCase')
    const getAppMetadataDto = await getAppMetadataUseCase.execute(app)
    return c.json(getAppMetadataDto)
  }
}
