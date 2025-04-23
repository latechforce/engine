import type { TableConfig, TableEntites, TableServices } from './TableTypes'
import { Bucket } from '../Bucket'
import type { SchemaError } from '../Error/Schema'
import type { Field } from '../Field'
import type { DatabaseTable } from '/domain/services/DatabaseTable'
import type { SchemaValidatorJson } from '/domain/services/SchemaValidator'
import { FilterMapper, filterSchema } from '../Filter'
import type { ConfigError } from '../Error/Config'
import type { FilterConfig } from '../Filter'
import {
  SingleSelectField,
  MultipleSelectField,
  SingleLinkedRecordField,
  MultipleLinkedRecordField,
  SingleLineTextField,
  LongTextField,
  EmailField,
  NumberField,
  DateTimeField,
  SingleAttachmentField,
  MultipleAttachmentField,
} from '../Field'
import { JsonResponse } from '../Response/Json'
import type { Record, RecordFieldAttachment, RecordFieldsConfig } from '../Record'
import type { GetRequest, PostRequest, PatchRequest, DeleteRequest } from '../Request'

export class Table {
  readonly name: string
  readonly fields: Field[]
  readonly path: string
  readonly recordPath: string
  readonly db: DatabaseTable
  readonly bucket: Bucket

  constructor(
    config: TableConfig,
    private _services: TableServices,
    entities: TableEntites
  ) {
    const { name } = config
    const { database, system } = _services
    const { fields } = entities
    this.name = name
    this.fields = fields
    this.path = system.joinPath(`/api/table`, name)
    this.recordPath = system.joinPath(this.path, ':id')
    this.db = database.table(this.config)
    this.bucket = new Bucket({ name: `table_${name}_attachments` }, _services)
  }

  get config(): TableConfig {
    return {
      name: this.name,
      fields: this.fields.map((field) => field.config),
    }
  }

  init = async () => {
    const { server } = this._services
    await Promise.all([
      server.post(this.path, this.post),
      server.get(this.path, this.getAll),
      server.get(this.recordPath, this.get),
      server.patch(this.recordPath, this.patch),
      server.delete(this.recordPath, this.delete),
    ])
    await this.bucket.init()
  }

  validate = async (): Promise<ConfigError[]> => {
    return []
  }

  dependancies = () => {
    const dependancies: string[] = []
    for (const field of this.fields) {
      if (field instanceof SingleLinkedRecordField || field instanceof MultipleLinkedRecordField) {
        dependancies.push(field.table)
      }
    }
    return dependancies.filter((value, index, self) => self.indexOf(value) === index)
  }

  read = async (filterConfig: FilterConfig): Promise<Record | undefined> => {
    const filter = FilterMapper.toEntity(filterConfig)
    return this.db.read(filter)
  }

  readById = async (id: string): Promise<Record | undefined> => {
    return this.db.readById(id)
  }

  get = async (request: GetRequest) => {
    const id = request.getParamOrThrow('id')
    const record = await this.readById(id)
    return new JsonResponse({ record }, record ? 200 : 404)
  }

  list = async (
    filterConfig?: unknown
  ): Promise<
    { records: Record[]; error?: undefined } | { records?: undefined; error: SchemaError }
  > => {
    const { schemaValidator } = this._services
    if (!filterConfig) {
      const records = await this.db.list()
      return { records }
    } else if (schemaValidator.validateType<FilterConfig>(filterConfig, filterSchema)) {
      const filter = FilterMapper.toEntity(filterConfig)
      const records = await this.db.list({ filter })
      return { records }
    }
    const [error] = schemaValidator.validate(filterConfig, filterSchema)
    return { error }
  }

  getAll = async () => {
    const { records, error } = await this.list()
    return new JsonResponse({ records, error }, error ? 400 : 200)
  }

  insert = async (
    data: unknown
  ): Promise<
    { record: Record; error?: undefined } | { record?: undefined; error: SchemaError }
  > => {
    const { schemaValidator } = this._services
    const schema = this._getRecordSchema()
    if (schemaValidator.validateType<RecordFieldsConfig>(data, schema)) {
      const uploadedData = await this._uploadAttachments(data)
      const record = await this.db.insert(uploadedData)
      return { record }
    }
    const [error] = schemaValidator.validate(data, schema)
    return { error }
  }

  post = async (request: PostRequest) => {
    try {
      const { body } = request
      const { record, error } = await this.insert(body)
      return new JsonResponse({ record, error }, error ? 400 : 201)
    } catch (error) {
      if (error instanceof Error) {
        this._services.monitor.captureException(error)
        return new JsonResponse({ error: error.message }, 400)
      }
      return new JsonResponse({ error: 'Unknown error' }, 500)
    }
  }

  update = async (
    id: string,
    data: unknown
  ): Promise<
    { record: Record; error?: undefined } | { record?: undefined; error: SchemaError }
  > => {
    const { schemaValidator } = this._services
    const schema = this._getRecordSchema({ required: false })
    if (schemaValidator.validateType<RecordFieldsConfig>(data, schema)) {
      const record = await this.db.update(id, data)
      return { record }
    }
    const [error] = schemaValidator.validate(data, schema)
    return { error }
  }

  patch = async (request: PatchRequest) => {
    try {
      const { body } = request
      const id = request.getParamOrThrow('id')
      const { record, error } = await this.update(id, body)
      return new JsonResponse({ record, error }, error ? 400 : 204)
    } catch (error) {
      if (error instanceof Error) {
        this._services.monitor.captureException(error)
        return new JsonResponse({ error: error.message }, 400)
      }
      return new JsonResponse({ error: 'Unknown error' }, 500)
    }
  }

  delete = async (request: DeleteRequest) => {
    try {
      const id = request.getParamOrThrow('id')
      await this.db.delete(id)
      return new JsonResponse({ id })
    } catch (error) {
      if (error instanceof Error) {
        return new JsonResponse({ error: error.message }, 400)
      }
      return new JsonResponse({ error: 'Unknown error' }, 500)
    }
  }

  private _getRecordSchema = (options?: { required: boolean }): SchemaValidatorJson => {
    const { required = true } = options || {}
    const schema: SchemaValidatorJson = {
      type: 'object',
      properties: {},
      required: [],
    }
    if (schema.properties && schema.required) {
      for (const field of this.fields) {
        if (field.name === 'id' || field.name === 'created_at' || field.name === 'updated_at')
          continue
        if (field instanceof SingleSelectField) {
          const options: string[] = field.options
          if (!field.required) {
            options.push('')
          }
          schema.properties[field.name] = {
            type: 'string',
            enum: options,
          }
        }
        if (field instanceof MultipleSelectField) {
          const options: string[] = field.options
          if (!field.required) {
            options.push('')
          }
          schema.properties[field.name] = {
            type: 'array',
            items: {
              type: 'string',
              enum: options,
            },
          }
        }
        if (
          field instanceof SingleLinkedRecordField ||
          field instanceof SingleLineTextField ||
          field instanceof LongTextField ||
          field instanceof EmailField ||
          field instanceof DateTimeField
        ) {
          schema.properties[field.name] = { type: 'string' }
        }
        if (field instanceof NumberField) {
          schema.properties[field.name] = { type: 'number' }
        }
        if (field instanceof MultipleLinkedRecordField) {
          schema.properties[field.name] = { type: 'array', items: { type: 'string' } }
        }
        if (field instanceof MultipleAttachmentField) {
          schema.properties[field.name] = {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                size: { type: 'number' },
                name: { type: 'string' },
                url: { type: 'string' },
              },
              required: ['name'],
            },
          }
        }
        if (field instanceof SingleAttachmentField) {
          schema.properties[field.name] = {
            type: 'object',
            properties: {
              size: { type: 'number' },
              name: { type: 'string' },
              url: { type: 'string' },
            },
            required: ['name'],
          }
        }
        if (required && field.required) {
          schema.required.push(field.name)
        }
      }
    }
    return schema
  }

  private _uploadAttachments = async (data: RecordFieldsConfig): Promise<RecordFieldsConfig> => {
    const { system, idGenerator } = this._services
    for (const field of this.fields) {
      if (field instanceof MultipleAttachmentField) {
        const value = data[field.name]
        let files: (File | { name: string; url: string })[] = []
        if (Array.isArray(value)) {
          files = value as unknown as (File | { name: string; url: string })[]
        } else {
          files = value ? [value as unknown as File | { name: string; url: string }] : []
        }
        if (files.length > 0) {
          const attachments: RecordFieldAttachment[] = []
          for (const uploadedFile of files) {
            if (uploadedFile instanceof File) {
              const file = await this.bucket.save({
                name: uploadedFile.name,
                data: Buffer.from(await uploadedFile.arrayBuffer()),
              })
              attachments.push(file.toAttachment())
            } else {
              attachments.push({
                id: idGenerator.forFile(),
                name: uploadedFile.name,
                url: uploadedFile.url,
                mime_type: system.getMimeType(uploadedFile.name),
                created_at: new Date().toISOString(),
              })
            }
          }
          data[field.name] = attachments
        }
      } else if (field instanceof SingleAttachmentField) {
        const uploadedFile: File | { name: string; url: string } = data[field.name] as
          | File
          | { name: string; url: string }
        if (uploadedFile instanceof File) {
          const file = await this.bucket.save({
            name: uploadedFile.name,
            data: Buffer.from(await uploadedFile.arrayBuffer()),
          })
          data[field.name] = file.toAttachment()
        } else {
          data[field.name] = {
            id: idGenerator.forFile(),
            name: uploadedFile.name,
            url: uploadedFile.url,
            mime_type: system.getMimeType(uploadedFile.name),
            created_at: new Date().toISOString(),
          }
        }
      }
    }
    return data
  }
}
