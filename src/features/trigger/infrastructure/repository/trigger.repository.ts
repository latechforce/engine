import { inject, injectable } from 'inversify'
import { HTTPError } from 'ky'
import type { SchemaObject } from 'ajv'
import { CronJob } from 'cron'
import TYPES from '../../../../shared/application/di/types'
import type { LoggerService } from '../../../../shared/infrastructure/service/logger.service'
import type { ITokenRepository } from '../../../../features/connection/domain/repository-interface/token-repository.interface'
import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import { toTriggerIntegration } from '../../../../integrations/trigger'
import type { SchemaService } from '../../../../shared/infrastructure/service/validator.service'
import type { TemplateService } from '../../../../shared/infrastructure/service/template.service'
import type { IntegrationTriggerSchema } from '../../../../integrations/trigger.schema'
import type { Connection } from '../../../../features/connection/domain/entity/connection.entity'
import type { EnvService } from '../../../../shared/infrastructure/service/env.service'
import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'

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
    private readonly tokenRepository: ITokenRepository,
    @inject(TYPES.Service.Env)
    private readonly env: EnvService
  ) {}

  log = {
    debug: (message: string) => this.logger.child('trigger-repository').debug(message),
    http: (type: 'body' | 'formData', data: unknown) =>
      this.logger.http(`${type}: ${JSON.stringify(data)}`),
  }

  validateData(schema: SchemaObject, data: unknown): boolean {
    return this.validator.validate(schema, data)
  }

  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown> {
    return this.template.fillObject(template, data)
  }

  onCronTime(expression: string, timeZone: string, callback: () => Promise<void>): void {
    new CronJob(expression, callback, null, true, timeZone)
  }

  async setupIntegration(
    trigger: IntegrationTriggerSchema,
    connection: Connection,
    automation: Automation
  ): Promise<void> {
    try {
      let baseUrl = this.env.get('BASE_URL')
      if (baseUrl.includes('localhost')) {
        baseUrl = 'https://example.com'
      }
      const url = `${baseUrl}/api/automations/${automation.schema.id}`
      const integration = toTriggerIntegration(trigger, automation.schema.id)
      const token = await this.tokenRepository.getAccessToken(connection)
      if (token) await integration.setupTrigger(token, url)
      this.onCronTime('0 0 * * *', this.env.get('TIMEZONE'), async () => {
        const token = await this.tokenRepository.getAccessToken(connection)
        if (token) await integration.setupTrigger(token, url)
      })
    } catch (error) {
      if (error instanceof HTTPError) {
        const result = {
          automation: automation.schema.name,
          service: trigger.service,
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
