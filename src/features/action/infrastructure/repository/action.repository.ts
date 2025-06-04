// Third-party imports
import { inject, injectable } from 'inversify'
import { HTTPError } from 'ky'

// Shared imports
import TYPES from '../../../../shared/application/di/types'
import type { LoggerService, TemplateService } from '../../../../shared/infrastructure/service'

// Action domain imports
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { IntegrationAction } from '../../domain/entity/integration-action.entity'
import type { ActionResult } from '../../domain/value-object/action-result.value-object'
import type { IntegrationError } from '../../domain/value-object/integration-error.value.object'

// Action infrastructure imports
import type { CodeService, TableContext } from '../service/code.service'
import { toActionIntegration } from '../integration'

// Connection domain imports
import type { ITokenRepository } from '../../../connection/domain/repository-interface/token-repository.interface'
import type { Fields } from '../../../table/domain/object-value/fields.object-value'
import type { IRecordRepository } from '../../../table/domain/repository-interface/record-repository.interface'
import type { App } from '../../../app/domain/entity/app.entity'
import { Record } from '../../../table/domain/entity/record.entity'

@injectable()
export class ActionRepository implements IActionRepository {
  constructor(
    @inject(TYPES.Action.Service.Code)
    private readonly codeService: CodeService,
    @inject(TYPES.Service.Template)
    private readonly templateService: TemplateService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Connection.Repository.Token)
    private readonly tokenRepository: ITokenRepository,
    @inject(TYPES.Table.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {
    this.logger = this.logger.child('action-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  fillInputData<T extends { [key: string]: object | string }>(
    inputData: T,
    data: { [key: string]: object }
  ): T {
    return this.templateService.fillObject<T>(inputData, data)
  }

  code(app: App, inputData: { [key: string]: string } = {}) {
    const table: TableContext = (name: string) => {
      const table = app.findTable(name)
      if (!table) throw new Error(`Table "${name}" not found`)
      return {
        exists: async (id: string) => await this.recordRepository.exists(table, id),
        create: async (fields: Fields) => {
          const record = new Record(fields)
          await this.recordRepository.create(table, record)
          return record
        },
        createMany: async (recordsFields: { fields: Fields }[]) => {
          const records = recordsFields.map((recordField) => new Record(recordField.fields))
          await this.recordRepository.createMany(table, records)
          return records
        },
        update: async (id: string, fields: Fields) => {
          await this.recordRepository.update(id, fields)
          const record = await this.recordRepository.read(table, id)
          if (!record) throw new Error(`Record "${id}" not found`)
          return record
        },
        updateMany: async (recordsFields: { id: string; fields: Fields }[]) => {
          await this.recordRepository.updateMany(recordsFields)
          const records = await this.recordRepository.listByIds(
            table,
            recordsFields.map((recordField) => recordField.id)
          )
          return records
        },
        read: async (id: string) => await this.recordRepository.read(table, id),
        list: async () => await this.recordRepository.list(table),
        delete: async (id: string) => {
          await this.recordRepository.delete(id)
        },
        deleteMany: async (ids: string[]) => {
          await this.recordRepository.deleteMany(ids)
        },
      }
    }
    return {
      lint: (code: string) => this.codeService.lint(code, inputData, table),
      fillInputData: (data: { [key: string]: unknown }) =>
        this.templateService.fillObject(inputData, data) as { [key: string]: string },
      runJavascript: (code: string) => this.codeService.runJavascript(code, inputData, table),
      runTypescript: (code: string) => this.codeService.runTypescript(code, inputData, table),
    }
  }

  http(url: string, options?: RequestInit) {
    return {
      get: () => fetch(url, options).then((res) => res.json()),
      post: (body?: { [key: string]: unknown }) =>
        fetch(url, { ...options, method: 'POST', body: JSON.stringify(body ?? {}) }).then((res) =>
          res.json()
        ),
    }
  }

  async runIntegration(action: IntegrationAction): Promise<ActionResult<IntegrationError>> {
    try {
      const integration = toActionIntegration(action)
      const token = await this.tokenRepository.getAccessToken(action.connection)
      if (!token) throw new Error(`Token not found for connection ${action.connection.schema.id}`)
      const data = await integration.runAction(token)
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
