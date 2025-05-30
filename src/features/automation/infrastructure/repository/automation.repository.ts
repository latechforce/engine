import TYPES from '@/shared/application/di/types'
import type { LoggerService } from '@/shared/infrastructure/service/logger.service'
import type { IAutomationRepository } from '@/automation/domain/repository-interface/automation-repository.interface'
import { inject, injectable } from 'inversify'

@injectable()
export class AutomationRepository implements IAutomationRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {}

  debug(message: string) {
    this.logger.child('automation-repository').debug(message)
  }

  info(message: string) {
    this.logger.info(message)
  }
}
