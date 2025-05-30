import TYPES from '@/shared/application/di/types'
import { injectable, inject } from 'inversify'
import { App } from '../../domain/entity/app.entity'
import type { IAppRepository } from '../../domain/repository-interface/app-repository.interface'
import type { SetupAutomationUseCase } from '@/automation/application/use-case/setup-automation.use-case'
import type { SetupTableUseCase } from '@/table/application/use-case/setup-table.use-case'
import type { ValidateAppUseCase } from './validate-app.use-case'
import type { SetupConnectionUseCase } from '@/connection/application/use-case/setup-connection.use-case'

@injectable()
export class StartAppUseCase {
  constructor(
    @inject(TYPES.App.Repository)
    private readonly appRepository: IAppRepository,
    @inject(TYPES.Automation.UseCase.Setup)
    private readonly setupAutomationUseCase: SetupAutomationUseCase,
    @inject(TYPES.Table.UseCase.Setup)
    private readonly setupTableUseCase: SetupTableUseCase,
    @inject(TYPES.Connection.UseCase.Setup)
    private readonly setupConnectionUseCase: SetupConnectionUseCase,
    @inject(TYPES.App.UseCase.Validate)
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
    for (const connection of app.connections) {
      await this.setupConnectionUseCase.execute(connection)
    }
    for (const table of app.tables) {
      await this.setupTableUseCase.execute(table)
    }
    for (const automation of app.automations) {
      await this.setupAutomationUseCase.execute(automation)
    }
    await this.appRepository.start()
    this.appRepository.info(`App "${app.schema.name}" is running at ${app.url()}`)
    return app
  }
}
