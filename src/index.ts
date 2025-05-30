// Third-party imports
import './instrument'
import 'reflect-metadata'

// Absolute imports
import { registerDependencies } from '@/shared/infrastructure/di/container'
import TYPES from '@/shared/application/di/types'
import type { StartAppUseCase } from '@/app/application/use-case/start-app.use-case'
import type { ValidateAppUseCase } from '@/app/application/use-case/validate-app.use-case'
import type { MockAppUseCase } from '@/app/application/use-case/mock-app.use-case'
import type { Mock } from '@/app/domain/value-object/mock.value-object'
import { apiRoutes } from '@/shared/interface/routes'

export * from './types'

type Options = {
  externals?: Record<string, unknown>
  mock?: Mock
}

export default class App {
  constructor(private readonly options: Options = {}) {}

  async validate(unknownSchema: unknown) {
    const container = await registerDependencies(this.options.externals, apiRoutes)
    const validateAppUseCase = container.get<ValidateAppUseCase>(TYPES.App.UseCase.Validate)
    return validateAppUseCase.execute(unknownSchema)
  }

  async start(unknownSchema: unknown = {}) {
    const { mock, externals } = this.options
    const container = await registerDependencies(externals, apiRoutes)
    if (mock) container.get<MockAppUseCase>(TYPES.App.UseCase.Mock).execute(mock)
    const startAppUseCase = container.get<StartAppUseCase>(TYPES.App.UseCase.Start)
    return startAppUseCase.execute(unknownSchema)
  }
}
