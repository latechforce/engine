import TYPES from '@/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import { App } from '@/domain/entity/app.entity'
import type { IAppRepository } from '@/domain/repository-interface/app-repository.interface'
import type { SetupAutomationUseCase } from '../automation/setup-automation.use-case'
import type { SetupTableUseCase } from '../table/setup-table.use-case'
import type { ValidateAppUseCase } from './validate-app.use-case'

@injectable()
export class StartAppUseCase {
  constructor(
    @inject(TYPES.Repository.App)
    private readonly appRepository: IAppRepository,
    @inject(TYPES.UseCase.SetupAutomation)
    private readonly setupAutomationUseCase: SetupAutomationUseCase,
    @inject(TYPES.UseCase.SetupTable)
    private readonly setupTableUseCase: SetupTableUseCase,
    @inject(TYPES.UseCase.ValidateApp)
    private readonly validateAppUseCase: ValidateAppUseCase
  ) {}

  async execute(unknownSchema: unknown): Promise<App> {
    this.appRepository.info('Starting app...')
    const env = await this.appRepository.loadEnv()
    const { schema, error } = await this.validateAppUseCase.execute(unknownSchema)
    if (!schema) {
      this.appRepository.error(error)
      throw new Error('Invalid app schema')
    }
    const app = new App(schema, env)
    await this.appRepository.setup(app)
    for (const automation of app.automations) {
      await this.setupAutomationUseCase.execute(automation)
    }
    for (const table of app.tables) {
      await this.setupTableUseCase.execute(table)
    }
    await this.appRepository.start()
    this.appRepository.info(`App "${app.schema.name}" is running at ${app.url()}`)
    return app
  }
}
