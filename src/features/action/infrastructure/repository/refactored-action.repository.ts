import type { App } from '../../../app/domain/entity/app.entity'
import type { IntegrationActionSchema } from '../../../../shared/integrations/core/action.schema'
import type { ActionResult } from '../../domain/value-object/action-result.value-object'
import type { IntegrationError } from '../../domain/value-object/integration-error.value-object'
import type { Connection } from '../../../connection/domain/entity/connection.entity'
import type { Table } from '../../../table/domain/entity/table.entity'
import type { FieldValue } from '../../../table/domain/object-value/field-value.object-value'
import type { Record as RecordType } from '../../../table/domain/entity/record.entity'
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'

// Decomposed services
import type { ICodeExecutionService } from '../../../../shared/domain/service/code-execution.service.interface'
import type { IHttpService } from '../../../../shared/domain/service/http.service.interface'
import type { IIntegrationService } from '../../../../shared/domain/service/integration.service.interface'
import type { TemplateService } from '../../../../shared/infrastructure/service/template.service'
import type { LoggerService } from '../../../../shared/infrastructure/service/logger.service'
import type { IRecordRepository } from '../../../table/domain/repository-interface/record-repository.interface'
import { Record as RecordEntity } from '../../../table/domain/entity/record.entity'

/**
 * Refactored ActionRepository using decomposed services
 * This demonstrates the improved architecture with single-responsibility services
 */
export class RefactoredActionRepository implements IActionRepository {
  constructor(
    private readonly codeExecutionService: ICodeExecutionService,
    private readonly httpService: IHttpService,
    private readonly integrationService: IIntegrationService,
    private readonly templateService: TemplateService,
    private readonly logger: LoggerService,
    private readonly recordRepository: IRecordRepository
  ) {}

  log = {
    debug: (message: string) => this.logger.child('refactored-action-repository').debug(message),
    error: (message: string) => this.logger.child('refactored-action-repository').error(message),
  }

  validateSchemaTemplate(schema: { [key: string]: unknown }) {
    const cloneSchema = JSON.parse(JSON.stringify(schema))
    this.templateService.fillObject(cloneSchema, {})
  }

  fillSchema<T extends { [key: string]: unknown }>(
    schema: T,
    data?: { [key: string]: unknown }
  ): T {
    const cloneSchema = JSON.parse(JSON.stringify(schema))
    const result = this.templateService.fillObject<T>(cloneSchema, data)
    return result
  }

  code(app: App, inputData: { [key: string]: string } = {}) {
    return {
      lint: (code: string) => this.codeExecutionService.lint(code, inputData),
      runJavascript: (code: string) => this.codeExecutionService.executeJavaScript(code, inputData),
      runTypescript: (code: string) => this.codeExecutionService.executeTypeScript(code, inputData),
    }
  }

  http(url: string, options?: RequestInit) {
    const headers = (options?.headers as Record<string, string>) || {}

    return {
      get: () => this.httpService.get(url, headers),
      post: (body?: { [key: string]: unknown }) => this.httpService.post(url, body, headers),
    }
  }

  database(table: Table) {
    return {
      create: async (fields: { [key: string]: FieldValue }): Promise<RecordType> => {
        const record = new RecordEntity(fields)
        await this.recordRepository.create(table, record)
        return record
      },
    }
  }

  async runIntegration(
    schema: IntegrationActionSchema,
    connection: Connection
  ): Promise<ActionResult<IntegrationError>> {
    return await this.integrationService.execute(schema, connection)
  }
}
