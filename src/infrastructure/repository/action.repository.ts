import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { CodeService } from '../service/code.service'
import type { LoggerService } from '../service/logger.service'
import type { TemplateService } from '../service/template.service'
import type { IntegrationAction } from '@/domain/entity/action/integration-action.entity'
import { mapIntegration } from '../integration/mapper'
import type { ITokenRepository } from '@/domain/repository-interface/token-repository.interface'
import { HTTPError } from 'ky'
import type { ActionResult } from '@/domain/value-object/action-result.value-object'
import type { IntegrationError } from '@/domain/value-object/integration-error.value.object'

@injectable()
export class ActionRepository implements IActionRepository {
  constructor(
    @inject(TYPES.Service.Code)
    private readonly codeService: CodeService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Template)
    private readonly templateService: TemplateService,
    @inject(TYPES.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {
    this.logger = this.logger.child('action-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  code(inputData: Record<string, string> = {}) {
    return {
      lint: (code: string) => this.codeService.lint(code, inputData),
      fillInputData: (data: Record<string, unknown>) =>
        this.templateService.fillObject(inputData, data) as Record<string, string>,
      runJavascript: (code: string) => this.codeService.runJavascript(code, inputData),
      runTypescript: (code: string) => this.codeService.runTypescript(code, inputData),
    }
  }

  http(url: string, options?: RequestInit) {
    return {
      get: () => fetch(url, options).then((res) => res.json()),
      post: (body?: Record<string, unknown>) =>
        fetch(url, { ...options, method: 'POST', body: JSON.stringify(body ?? {}) }).then((res) =>
          res.json()
        ),
    }
  }

  async runIntegration(action: IntegrationAction): Promise<ActionResult<IntegrationError>> {
    try {
      const integration = mapIntegration(action.connection)
      const token = await this.tokenRepository.getAccessToken(action.connection)
      if (!token) throw new Error(`Token not found for connection ${action.connection.schema.id}`)
      const data = await integration.runAction(action, token)
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
