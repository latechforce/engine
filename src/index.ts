import 'reflect-metadata'
import { registerDependencies } from '@/infrastructure/di/container'
import TYPES from '@/infrastructure/di/types'
import type { StartAppUseCase } from '@/application/use-case/app/start-app.use-case'
import type { ValidateAppUseCase } from './application/use-case/app/validate-app.use-case'

export * from './types'

type Options = {
  externals?: Record<string, unknown>
}

export default class App {
  constructor(private readonly options: Options = {}) {}

  async validate(unknownSchema: unknown) {
    const container = await registerDependencies(this.options.externals)
    const validateAppUseCase = container.get<ValidateAppUseCase>(TYPES.UseCase.ValidateApp)
    return validateAppUseCase.execute(unknownSchema)
  }

  async start(unknownSchema: unknown = {}) {
    const container = await registerDependencies(this.options.externals)
    const startAppUseCase = container.get<StartAppUseCase>(TYPES.UseCase.StartApp)
    return startAppUseCase.execute(unknownSchema)
  }
}
