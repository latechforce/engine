// Third-party imports
import './instrument'

// Relative imports
import { registerDependencies } from './shared/infrastructure/di/container'
import { apiRoutes } from './shared/interface/routes'
import { AppController } from './features/app/interface/controller/app.controller'

export * from './types'

type Options = {
  externals?: Record<string, unknown>
}

export default class App {
  constructor(private readonly options: Options = {}) {}

  private async getAppController(externals: Record<string, unknown> = {}) {
    const services = await registerDependencies(externals, apiRoutes)
    return new AppController(services.app.useCases.validate, services.app.useCases.start)
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
