import type { App } from '@/domain/entity/app.entity'
import TYPES from '@/infrastructure/di/types'
import { inject } from 'inversify'
import type { ValidateAppUseCase } from '@/application/use-case/app/validate-app.use-case'
import type { StartAppUseCase } from '@/application/use-case/app/start-app.use-case'
import type { ValidateResult } from '@/domain/value-object/validate-result.value-object'

export class AppController {
  constructor(
    @inject(TYPES.UseCase.ValidateApp)
    private readonly validateAppUseCase: ValidateAppUseCase,
    @inject(TYPES.UseCase.StartApp)
    private readonly startAppUseCase: StartAppUseCase
  ) {}

  validate(unknownSchema: unknown): Promise<ValidateResult> {
    return this.validateAppUseCase.execute(unknownSchema)
  }

  async start(unknownSchema: unknown): Promise<App> {
    return this.startAppUseCase.execute(unknownSchema)
  }
}
