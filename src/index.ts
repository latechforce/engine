// Third-party imports
import './instrument'
import 'reflect-metadata'

// Relative imports
import { registerDependencies } from './shared/infrastructure/di/container'
import TYPES from './shared/application/di/types'
import { apiRoutes } from './shared/interface/routes'
import { AppController } from './features/app/interface/controller/app.controller'

export * from './types'

type Options = {
  externals?: Record<string, unknown>
}

export default class App {
  constructor(private readonly options: Options = {}) {}

  private async getAppController(externals: Record<string, unknown> = {}) {
    const container = await registerDependencies(externals, apiRoutes)
    container.bind<AppController>(TYPES.App.Controller).to(AppController).inSingletonScope()
    return container.get<AppController>(TYPES.App.Controller)
  }

  async validate(unknownSchema: unknown = {}) {
    const { externals } = this.options
    const appController = await this.getAppController(externals)
    return appController.validate(unknownSchema)
  }

  async start(unknownSchema: unknown = {}) {
    const { externals } = this.options
    const appController = await this.getAppController(externals)
    return appController.start(unknownSchema)
  }
}
