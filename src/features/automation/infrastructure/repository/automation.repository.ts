import TYPES from '../../../../shared/application/di/types'
import type { LoggerService } from '../../../../shared/infrastructure/service'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'
import { inject, injectable } from 'inversify'
import type { RouteConfig } from '@hono/zod-openapi'
import type { ServerService } from '../../../../shared/infrastructure/service'
import type { AutomationDatabaseService } from '../service/database.service'
import type { AutomationStatus } from '../../domain/value-object/automation-status.value-object'
import type { AutomationSchema } from '../../domain/schema/automation.schema'

@injectable()
export class AutomationRepository implements IAutomationRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Server)
    private readonly server: ServerService,
    @inject(TYPES.Automation.Service.Database)
    private readonly database: AutomationDatabaseService
  ) {}

  debug(message: string) {
    this.logger.child('automation-repository').debug(message)
  }

  error(message: string) {
    this.logger.child('automation-repository').error(message)
  }

  info(message: string) {
    this.logger.info(message)
  }

  addOpenAPIRoute(routeConfig: RouteConfig) {
    this.server.addOpenAPIRoute(routeConfig)
  }

  get status() {
    return {
      create: async (status: AutomationStatus) => {
        await this.database.automation_status.create({
          id: status.id,
          active: status.active,
          schema: status.schema,
          created_at: status.createdAt,
          updated_at: status.updatedAt,
        })
      },
      updateSchema: async (id: number, schema: AutomationSchema) => {
        await this.database.automation_status.update(id, {
          schema,
          updated_at: new Date(),
        })
      },
      setActive: async (id: number, active: boolean) => {
        await this.database.automation_status.update(id, {
          active,
          updated_at: new Date(),
        })
      },
      get: async (id: number) => {
        const status = await this.database.automation_status.get(id)
        if (!status) {
          return undefined
        }
        return {
          id: status.id,
          active: status.active,
          schema: status.schema,
          createdAt: status.created_at,
          updatedAt: status.updated_at,
        }
      },
      listByIds: async (ids: number[]) => {
        const statuses = await this.database.automation_status.listByIds(ids)
        return statuses.map((status) => ({
          id: status.id,
          active: status.active,
          schema: status.schema,
          createdAt: status.created_at,
          updatedAt: status.updated_at,
        }))
      },
    }
  }
}
