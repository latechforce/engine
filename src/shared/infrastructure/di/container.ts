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
import { SimpleContainer } from './simple-container'

// Feature infrastructure imports
import { registerAppDependencies } from '../../../features/app/infrastructure/di/container'
import { registerActionDependencies } from '../../../features/action/infrastructure/di/container'
import { registerUserDependencies } from '../../../features/user/infrastructure/di/container'
import { registerAutomationDependencies } from '../../../features/automation/infrastructure/di/container'
import { registerFormDependencies } from '../../../features/form/infrastructure/di/container'
import { registerRunDependencies } from '../../../features/run/infrastructure/di/container'
import { registerTriggerDependencies } from '../../../features/trigger/infrastructure/di/container'
import { registerConnectionDependencies } from '../../../features/connection/infrastructure/di/container'
import { registerBucketDependencies } from '../../../features/bucket/infrastructure/di/container'

// New factory-based feature imports
import { createTableServices } from '../../../features/table/infrastructure/factory'

export async function registerDependencies(
  externals: Record<string, unknown> = {},
  apiRoutes: Hono<HonoType>
) {
  const container = new Container()

  // Register Hono routes first (needed by ServerService)
  container.bind<Hono<HonoType>>(TYPES.Hono.Routes).toConstantValue(apiRoutes)

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

  // Create simple container for new factory-based features
  const simpleContainer = new SimpleContainer()
  simpleContainer.set('logger', container.get<LoggerService>(TYPES.Service.Logger))
  simpleContainer.set('server', container.get<ServerService>(TYPES.Service.Server))
  simpleContainer.set('database', container.get<DatabaseService>(TYPES.Service.Database))
  simpleContainer.set('validator', container.get<SchemaService>(TYPES.Service.Schema))
  simpleContainer.set('template', container.get<TemplateService>(TYPES.Service.Template))
  simpleContainer.set('email', container.get<EmailService>(TYPES.Service.Email))

  // Register dependencies using old Inversify approach
  registerUserDependencies(container)
  registerActionDependencies(container, externals)
  registerAppDependencies(container)
  registerAutomationDependencies(container)
  registerFormDependencies(container)
  registerRunDependencies(container)
  registerTriggerDependencies(container)
  registerConnectionDependencies(container)
  registerBucketDependencies(container)

  // Get bucket object repository for table feature dependency
  const bucketServices = container.get(TYPES.Bucket.Repository.Object)
  simpleContainer.set('objectRepository', bucketServices)

  // Register table feature using new factory approach
  const tableServices = createTableServices(simpleContainer)

  // Bind table services back to the main container for compatibility
  container.bind(TYPES.Table.Repository.Table).toConstantValue(tableServices.repositories.table)
  container.bind(TYPES.Table.Repository.Record).toConstantValue(tableServices.repositories.record)
  container.bind(TYPES.Table.UseCase.Setup).toConstantValue(tableServices.useCases.setup)
  container
    .bind(TYPES.Table.UseCase.CreateRecord)
    .toConstantValue(tableServices.useCases.createRecord)
  container.bind(TYPES.Table.UseCase.ReadRecord).toConstantValue(tableServices.useCases.readRecord)
  container
    .bind(TYPES.Table.UseCase.ListRecords)
    .toConstantValue(tableServices.useCases.listRecords)
  container
    .bind(TYPES.Table.UseCase.UpdateRecord)
    .toConstantValue(tableServices.useCases.updateRecord)
  container
    .bind(TYPES.Table.UseCase.UpdateMultipleRecords)
    .toConstantValue(tableServices.useCases.updateMultipleRecords)
  container
    .bind(TYPES.Table.UseCase.DeleteRecord)
    .toConstantValue(tableServices.useCases.deleteRecord)
  container
    .bind(TYPES.Table.UseCase.DeleteMultipleRecords)
    .toConstantValue(tableServices.useCases.deleteMultipleRecords)
  container.bind(TYPES.Table.UseCase.List).toConstantValue(tableServices.useCases.listTables)
  container.bind(TYPES.Table.Service.Database).toConstantValue(tableServices.services.database)
  container.bind(TYPES.Table.HonoContext).toConstantValue(tableServices.context)

  container.bind<HonoContext>(TYPES.Hono.Context).to(HonoContext).inSingletonScope()

  return container
}
