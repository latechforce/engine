// Third-party imports
import { Container } from 'inversify'
import type { Hono } from 'hono'

// Shared infrastructure imports
import { EnvService } from '../service/env.service'
import { LoggerService } from '../service/logger.service'
import { ServerService, type HonoType } from '../service/server.service'
import { DatabaseService } from '../service/database.service'
import { ValidatorService } from '../service/validator.service'
import { TemplateService } from '../service/template.service'
import { HonoContext } from './context'
import TYPES from '../../application/di/types'

// Feature infrastructure imports
import { registerAppDependencies } from '@/app/infrastructure/di/container'
import { registerActionDependencies } from '@/action/infrastructure/di/container'
import { registerUserDependencies } from '@/user/infrastructure/di/container'
import { registerAutomationDependencies } from '@/automation/infrastructure/di/container'
import { registerFormDependencies } from '@/form/infrastructure/di/container'
import { registerRunDependencies } from '@/run/infrastructure/di/container'
import { registerTableDependencies } from '@/table/infrastructure/di/container'
import { registerTriggerDependencies } from '@/trigger/infrastructure/di/container'
import { registerConnectionDependencies } from '@/connection/infrastructure/di/container'

export async function registerDependencies(
  externals: Record<string, unknown> = {},
  apiRoutes: Hono<HonoType>
) {
  const container = new Container()

  // Register services
  container.bind<EnvService>(TYPES.Service.Env).to(EnvService).inSingletonScope()
  const envService = container.get<EnvService>(TYPES.Service.Env)
  await envService.load()

  container.bind<LoggerService>(TYPES.Service.Logger).to(LoggerService).inSingletonScope()
  container.bind<ServerService>(TYPES.Service.Server).to(ServerService).inSingletonScope()
  container.bind<DatabaseService>(TYPES.Service.Database).to(DatabaseService).inSingletonScope()
  container.bind<ValidatorService>(TYPES.Service.Validator).to(ValidatorService).inSingletonScope()
  container.bind<TemplateService>(TYPES.Service.Template).to(TemplateService).inSingletonScope()

  // Register dependencies
  registerUserDependencies(container)
  registerActionDependencies(container, externals)
  registerAppDependencies(container)
  registerAutomationDependencies(container)
  registerFormDependencies(container)
  registerRunDependencies(container)
  registerTableDependencies(container)
  registerTriggerDependencies(container)
  registerConnectionDependencies(container)

  container.bind<Hono<HonoType>>(TYPES.Hono.Routes).toConstantValue(apiRoutes)
  container.bind<HonoContext>(TYPES.Hono.Context).to(HonoContext).inSingletonScope()

  return container
}
