import { HTTPError } from 'ky'
import type { IIntegrationService } from '../../domain/service/integration.service.interface'
import type { IntegrationActionSchema } from '../../integrations/core/action.schema'
import type { Connection } from '../../../features/connection/domain/entity/connection.entity'
import type { ActionResult } from '../../../features/action/domain/value-object/action-result.value-object'
import type { IntegrationError } from '../../../features/action/domain/value-object/integration-error.value-object'
import type { IConnectionRepository } from '../../../features/connection/domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '../../../features/connection/domain/repository-interface/token-repository.interface'
import type { QueueService } from '../../../features/action/infrastructure/service/queue.service'
import type { LoggerService } from './logger.service'
import { toActionIntegration } from '../../integrations/core/action'

export class IntegrationService implements IIntegrationService {
  constructor(
    private readonly connectionRepository: IConnectionRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly queueService: QueueService,
    private readonly logger: LoggerService
  ) {}

  async execute(
    schema: IntegrationActionSchema,
    connection: Connection
  ): Promise<ActionResult<IntegrationError>> {
    try {
      const integration = toActionIntegration(
        schema,
        connection,
        this.connectionRepository.redirectUri
      )

      const data = await this.queueService.wait<{ [key: string]: unknown }>(
        schema.service + '-' + schema.action,
        async () => {
          const token = await this.tokenRepository.getAccessToken(connection)
          if (!token) {
            throw new Error(`Token not found for connection ${connection.id}`)
          }
          return await integration.runAction(token)
        }
      )

      return { data }
    } catch (error) {
      if (error instanceof HTTPError) {
        const result = {
          error: {
            status: error.response.status,
            message: error.message,
            response: await error.response.json(),
          },
        }
        this.logger.error(JSON.stringify(result, null, 2))
        return result
      } else if (error instanceof Error) {
        this.logger.error(error.message)
        return {
          error: {
            status: 500,
            message: error.message,
          },
        }
      } else {
        this.logger.error(String(error))
        return { error: { status: 500, message: 'Unknown error' } }
      }
    }
  }
}
