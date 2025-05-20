import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { LoggerService } from '../service/logger.service'

@injectable()
export class TriggerRepository implements ITriggerRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {
    this.logger = this.logger.child('trigger-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }
}
