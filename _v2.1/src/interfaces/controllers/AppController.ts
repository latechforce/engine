import type { StartAppUseCase } from '/application/use-cases/App/StartAppUseCase'
import { appValidator } from '/infrastucture/validators/AppValidators'

export class AppController {
  constructor(private startAppUseCase: StartAppUseCase) {}

  async start(appSchema: unknown) {
    const validatedAppSchema = await appValidator.validate(appSchema)
    return this.startAppUseCase.execute(validatedAppSchema)
  }
}
