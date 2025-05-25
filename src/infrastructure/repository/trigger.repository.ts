import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { LoggerService } from '../service/logger.service'
import { mapIntegration } from '../integration/mapper'
import type { IntegrationTrigger } from '@/domain/entity/trigger/integration-trigger.entity'
import type { ITokenRepository } from '@/domain/repository-interface/token-repository.interface'

@injectable()
export class TriggerRepository implements ITriggerRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {
    this.logger = this.logger.child('trigger-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  async setupIntegration(trigger: IntegrationTrigger) {
    const integration = mapIntegration(trigger.connection)
    const token = await this.tokenRepository.getAccessToken(trigger.connection)
    if (token) await integration.setupTrigger(trigger, token)
  }
}
