// Third-party imports
import { inject, injectable } from 'inversify'
import { HTTPError } from 'ky'
import type { SchemaObject } from 'ajv'

// Shared imports
import TYPES from '@/shared/application/di/types'
import type { LoggerService } from '@/shared/infrastructure/service/logger.service'

// Connection domain imports
import type { ITokenRepository } from '@/connection/domain/repository-interface/token-repository.interface'

// Trigger domain imports
import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import type { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'

// Trigger infrastructure imports
import { toTriggerIntegration } from '../integration'
import type { SchemaService } from '@/shared/infrastructure/service/validator.service'
import type { TemplateService } from '@/shared/infrastructure/service/template.service'

@injectable()
export class TriggerRepository implements ITriggerRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Schema)
    private readonly validator: SchemaService,
    @inject(TYPES.Service.Template)
    private readonly template: TemplateService,
    @inject(TYPES.Connection.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {
    this.logger = this.logger.child('trigger-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  validateData(schema: SchemaObject, data: unknown): boolean {
    return this.validator.validate(schema, data)
  }

  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown> {
    return this.template.fillObject(template, data)
  }

  async setupIntegration(trigger: IntegrationTrigger): Promise<void> {
    try {
      const integration = toTriggerIntegration(trigger.connection)
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
