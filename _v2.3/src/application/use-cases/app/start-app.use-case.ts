import { App } from '../../../domain/entities/app.entity'
import type { AppSchema } from '../../../domain/schemas/app.schema'
import type { IAppRepository } from '/domain/repositories/app-repository.interface'

export class StartAppUseCase {
  constructor(private appRepository: IAppRepository) {}

  async execute(appSchema: AppSchema): Promise<App> {
    const env = await this.appRepository.loadEnv()
    const app = new App(appSchema, env)
    this.appRepository.start()
    return app
  }
}
