// Third-party imports
import { inject, injectable } from 'inversify'
import { HTTPError } from 'ky'

// Shared imports
import TYPES from '../../../../shared/application/di/types'
import type { LoggerService, TemplateService } from '../../../../shared/infrastructure/service'

// Action domain imports
import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import type { ActionResult } from '../../domain/value-object/action-result.value-object'
import type { IntegrationError } from '../../domain/value-object/integration-error.value-object'

// Action infrastructure imports
import type {
  BucketContext,
  CodeService,
  LogContext,
  ServiceContext,
  TableContext,
} from '../service/code.service'
import { toActionIntegration } from '../../../../integrations/action'

// Connection domain imports
import type { Fields } from '../../../table/domain/object-value/fields.object-value'
import type { IRecordRepository } from '../../../table/domain/repository-interface/record-repository.interface'
import type { App } from '../../../app/domain/entity/app.entity'
import { Record } from '../../../table/domain/entity/record.entity'
import type { IntegrationActionSchema } from '../../../../integrations/action.schema'
import type { IObjectRepository } from '../../../bucket/domain/repository-interface/object-repository.interface'
import { Object } from '../../../bucket/domain/entity/object.entity'
import { toObjectDto } from '../../../bucket/application/dto/object.dto'
import type { ConditionsSchema } from '../../domain/schema/condition'
import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { IConnectionRepository } from '../../../connection/domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '../../../connection/domain/repository-interface/token-repository.interface'
import type { FieldValue } from '../../../table/domain/object-value/field-value.object-value'
import type { Table } from '../../../table/domain/entity/table.entity'

@injectable()
export class ActionRepository implements IActionRepository {
  constructor(
    @inject(TYPES.Action.Service.Code)
    private readonly codeService: CodeService,
    @inject(TYPES.Service.Template)
    private readonly templateService: TemplateService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Table.Repository.Record)
    private readonly recordRepository: IRecordRepository,
    @inject(TYPES.Bucket.Repository.Object)
    private readonly objectRepository: IObjectRepository,
    @inject(TYPES.Connection.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository,
    @inject(TYPES.Connection.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {}

  log = {
    debug: (message: string) => this.logger.child('action-repository').debug(message),
    error: (message: string) => this.logger.child('action-repository').error(message),
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
    const table: TableContext = <T extends Fields>(nameOrId: string | number) => {
      const table = app.findTable(nameOrId)
      if (!table) throw new Error(`Table "${nameOrId}" not found`)
      return {
        exists: async (id: string) => await this.recordRepository.exists(table, id),
        create: async (fields: T) => {
          const record = new Record<T>(fields)
          await this.recordRepository.create(table, record)
          return record
        },
        createMany: async (recordsFields: { fields: T }[]) => {
          const records = recordsFields.map((recordField) => new Record<T>(recordField.fields))
          await this.recordRepository.createMany(table, records)
          return records
        },
        update: async (id: string, fields: Partial<T>) => {
          await this.recordRepository.update(id, fields)
          const record = await this.recordRepository.read<T>(table, id)
          if (!record) throw new Error(`Record "${id}" not found`)
          return record
        },
        updateMany: async (recordsFields: { id: string; fields: Partial<T> }[]) => {
          await this.recordRepository.updateMany(recordsFields)
          const records = await this.recordRepository.listByIds<T>(
            table,
            recordsFields.map((recordField) => recordField.id)
          )
          return records
        },
        read: async (id: string) => await this.recordRepository.read<T>(table, id),
        list: async (filter?: ConditionsSchema) =>
          await this.recordRepository.list<T>(table, filter),
        delete: async (id: string) => {
          await this.recordRepository.delete(id)
        },
        deleteMany: async (ids: string[]) => {
          await this.recordRepository.deleteMany(ids)
        },
      }
    }
    const bucket: BucketContext = (name: string) => {
      const bucket = app.findBucket(name)
      if (!bucket) throw new Error(`Bucket "${name}" not found`)
      return {
        upload: async (key: string, data: Uint8Array) => {
          const object = new Object(
            key,
            bucket.schema.id,
            data,
            this.objectRepository.getMimeType(key),
            data.byteLength
          )
          const exists = await this.objectRepository.exists(bucket.schema.id, object.key)
          if (exists) {
            await this.objectRepository.update(object)
          } else {
            await this.objectRepository.create(object)
          }
        },
        download: async (key: string) => {
          const object = await this.objectRepository.get(bucket.schema.id, key)
          if (!object) throw new Error(`Object "${key}" not found`)
          return object.data
        },
        delete: async (key: string) => {
          await this.objectRepository.delete(bucket.schema.id, key)
        },
        get: async (key: string) => {
          const object = await this.objectRepository.get(bucket.schema.id, key)
          if (!object) throw new Error(`Object "${key}" not found`)
          return toObjectDto(object)
        },
        list: async () => {
          const objects = await this.objectRepository.listByBucketId(bucket.schema.id)
          return objects.map(toObjectDto)
        },
      }
    }
    const log: LogContext = {
      info: (message: string) => this.logger.info(message),
      debug: (message: string) => this.logger.child('code-action').debug(message),
      error: (message: string) => this.logger.child('code-action').error(message),
    }
    const service: ServiceContext = {
      log,
      table,
      bucket,
    }
    return {
      lint: (code: string) => this.codeService.lint(code, inputData, service),
      runJavascript: (code: string) => this.codeService.runJavascript(code, inputData, service),
      runTypescript: (code: string) => this.codeService.runTypescript(code, inputData, service),
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

  database(table: Table) {
    return {
      create: async (fields: { [key: string]: FieldValue }) => {
        const record = new Record(fields)
        await this.recordRepository.create(table, record)
        return record
      },
    }
  }

  async runIntegration(
    schema: IntegrationActionSchema,
    connection: ConnectionSchema
  ): Promise<ActionResult<IntegrationError>> {
    try {
      const integration = toActionIntegration(
        schema,
        connection,
        this.connectionRepository.redirectUri
      )
      const token = await this.tokenRepository.getAccessToken(connection)
      if (!token) throw new Error(`Token not found for connection ${connection.id}`)
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
