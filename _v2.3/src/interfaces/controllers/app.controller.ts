import { ZodError } from 'zod'
import type { StartAppUseCase } from '../../application/use-cases/app/start-app.use-case'
import { appValidator } from '../../infrastucture/validators/app.validator'

export class AppController {
  constructor(private startAppUseCase: StartAppUseCase) {}

  async start(appSchema: unknown) {
    try {
      const validatedAppSchema = appValidator.parse(appSchema)
      return this.startAppUseCase.execute(validatedAppSchema)
    } catch (error) {
      if (error instanceof ZodError) {
        const message =
          'Validation Errors:\n' +
          error.errors.map((err) => `- [${err.path.join('.')}] ${err.message}`).join('\n')
        throw new Error(message)
      }
      throw error
    }
  }
}
