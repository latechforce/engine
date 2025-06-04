import TYPES from '../../../../shared/application/di/types'
import type { LoggerService } from '../../../../shared/infrastructure/service'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'
import { inject, injectable } from 'inversify'
import type { RouteConfig } from '@hono/zod-openapi'
import type { ServerService } from '../../../../shared/infrastructure/service'

@injectable()
export class AutomationRepository implements IAutomationRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Server)
    private readonly serverService: ServerService
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
    this.serverService.addOpenAPIRoute(routeConfig)
  }
}
