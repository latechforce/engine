import { StartAppUseCase } from './application/use-cases/App/StartAppUseCase'
import { AdonisAppRepository } from './infrastucture/services/AdonysAppRepository'
import { AppController } from './interfaces/controllers/AppController'

const appController = new AppController(new StartAppUseCase(new AdonisAppRepository()))

export async function start(config: unknown) {
  const app = await appController.start(config)
  return app
}
