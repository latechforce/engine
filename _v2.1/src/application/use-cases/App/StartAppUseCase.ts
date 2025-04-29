import { App } from '/domain/entities/App'
import type { AppSchema } from '/domain/schemas/AppSchema'
import type { IAppRepository } from '/domain/repositories/IAppRepository'

export class StartAppUseCase {
  constructor(private appRepository: IAppRepository) {}

  async execute(appSchema: AppSchema): Promise<App> {
    const env = await this.appRepository.env()
    const app = new App(appSchema, env)
    await this.appRepository.start()
    return app
  }
}
