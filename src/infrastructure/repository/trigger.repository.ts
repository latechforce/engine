import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { LoggerService } from '../service/logger.service'
import { mapIntegration } from '../integration/mapper'
import type { IntegrationTrigger } from '@/domain/entity/trigger/integration-trigger.entity'
import type { ITokenRepository } from '@/domain/repository-interface/token-repository.interface'
import { HTTPError } from 'ky'

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

  async setupIntegration(trigger: IntegrationTrigger): Promise<void> {
    try {
      const integration = mapIntegration(trigger.connection)
      const token = await this.tokenRepository.getAccessToken(trigger.connection)
      if (token) await integration.setupTrigger(trigger, token)
    } catch (error) {
      if (error instanceof HTTPError) {
        const result = {
          automation: trigger.automationName,
          service: trigger.schema.service,
          status: error.response.status,
          message: error.message,
          response: await error.response.json(),
        }
        this.logger.error(JSON.stringify(result, null, 2))
        throw new Error(result.message)
      } else if (error instanceof Error) {
        this.logger.error(error.message)
        throw new Error(error.message)
      } else {
        this.logger.error(String(error))
        throw new Error('Unknown error')
      }
    }
  }
}
