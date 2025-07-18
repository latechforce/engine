// Third-party imports
import { Container } from 'inversify'
import type { Hono } from 'hono'

// Shared infrastructure imports
import { EnvService } from '../service/env.service'
import { LoggerService } from '../service/logger.service'
import { ServerService, type HonoType } from '../service/server.service'
import { DatabaseService } from '../service/database.service'
import { SchemaService } from '../service/validator.service'
import { TemplateService } from '../service/template.service'
import { EmailService } from '../service/email.service'
import { HonoContext } from './context'
import TYPES from '../../application/di/types'

// Feature infrastructure imports
import { registerAppDependencies } from '../../../features/app/infrastructure/di/container'
import { registerActionDependencies } from '../../../features/action/infrastructure/di/container'
import { registerUserDependencies } from '../../../features/user/infrastructure/di/container'
import { registerAutomationDependencies } from '../../../features/automation/infrastructure/di/container'
import { registerFormDependencies } from '../../../features/form/infrastructure/di/container'
import { registerRunDependencies } from '../../../features/run/infrastructure/di/container'
import { registerTableDependencies } from '../../../features/table/infrastructure/di/container'
import { registerTriggerDependencies } from '../../../features/trigger/infrastructure/di/container'
import { registerConnectionDependencies } from '../../../features/connection/infrastructure/di/container'
import { registerBucketDependencies } from '../../../features/bucket/infrastructure/di/container'

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
  container.bind<SchemaService>(TYPES.Service.Schema).to(SchemaService).inSingletonScope()
  container.bind<TemplateService>(TYPES.Service.Template).to(TemplateService).inSingletonScope()
  container.bind<EmailService>(TYPES.Service.Email).to(EmailService).inSingletonScope()

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
  registerBucketDependencies(container)

  container.bind<Hono<HonoType>>(TYPES.Hono.Routes).toConstantValue(apiRoutes)
  container.bind<HonoContext>(TYPES.Hono.Context).to(HonoContext).inSingletonScope()

  return container
}
