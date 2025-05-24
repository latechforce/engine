import 'reflect-metadata'
import { registerDependencies } from '@/infrastructure/di/container'
import TYPES from '@/infrastructure/di/types'
import type { StartAppUseCase } from '@/application/use-case/app/start-app.use-case'
import type { ValidateAppUseCase } from './application/use-case/app/validate-app.use-case'
import type { MockAppUseCase } from './application/use-case/app/mock-app.use-case'
import type { Mock } from './domain/value-object/mock.value-object'

export * from './types'

type Options = {
  externals?: Record<string, unknown>
  mock?: Mock
}

export default class App {
  constructor(private readonly options: Options = {}) {}

  async validate(unknownSchema: unknown) {
    const container = await registerDependencies(this.options.externals)
    const validateAppUseCase = container.get<ValidateAppUseCase>(TYPES.UseCase.ValidateApp)
    return validateAppUseCase.execute(unknownSchema)
  }

  async start(unknownSchema: unknown = {}) {
    const { mock, externals } = this.options
    const container = await registerDependencies(externals)
    if (mock) container.get<MockAppUseCase>(TYPES.UseCase.MockApp).execute(mock)
    const startAppUseCase = container.get<StartAppUseCase>(TYPES.UseCase.StartApp)
    return startAppUseCase.execute(unknownSchema)
  }
}
