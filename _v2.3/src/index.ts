import { StartAppUseCase } from './application/use-cases/app/start-app.use-case'
import { AppRepository } from './infrastucture/repositories/app.repository'
import { HonoServerService } from './infrastucture/services/hono-server.service'
import { BunEnvServices } from './infrastucture/services/bun-env.service'
import { AppController } from './interfaces/controllers/app.controller'
import type { ITableRepository } from './domain/repositories/table-repository.interface'
import { TableSqliteRepository } from './infrastucture/repositories/table-sqlite.repository'
import { DrizzleSqliteDbService } from './infrastucture/services/drizzle-sqlite-db.service'
import { DrizzlePostgresDbService } from './infrastucture/services/drizzle-postgres-db.service'
import { TablePostgresRepository } from './infrastucture/repositories/table-postgres.repository'
import { TableController } from './interfaces/controllers/table.controller'
import { StartTableUseCase } from './application/use-cases/table/start-table.use-case'

export async function start(config: unknown) {
  const env = new BunEnvServices()
  const server = new HonoServerService(env)
  const appRepository = new AppRepository(env, server)
  const appController = new AppController(new StartAppUseCase(appRepository))
  const app = await appController.start(config)
  let tableRepository: ITableRepository
  switch (env.get('DATABASE_CLIENT')) {
    case 'sqlite':
      tableRepository = new TableSqliteRepository(new DrizzleSqliteDbService(env))
      break
    case 'postgres':
      tableRepository = new TablePostgresRepository(new DrizzlePostgresDbService(env))
      break
    default:
      throw new Error(`Unsupported database client: ${env.get('DATABASE_CLIENT')}`)
  }
  const tableController = new TableController(new StartTableUseCase(tableRepository))
  for (const table of app.tables) {
    await tableController.start(table)
  }
  return app
}
