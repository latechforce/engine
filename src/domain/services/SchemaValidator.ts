import type { SchemaError } from '/domain/entities/Error/Schema'

type SchemaValidatorJsonType = 'string' | 'number' | 'boolean' | 'array' | 'object'

export interface SchemaValidatorJsonProperties {
  [key: string]: SchemaValidatorJson
}

export interface SchemaValidatorJson {
  type?: SchemaValidatorJsonType
  properties?: SchemaValidatorJsonProperties
  enum?: string[]
  items?: SchemaValidatorJson
  required?: string[]
  additionalProperties?: boolean
  oneOf?: SchemaValidatorJson[]
}

export interface ISchemaValidatorSpi {
  validateConfigSchema(json: unknown): SchemaError[]
  validate(json: unknown, schema: SchemaValidatorJson): SchemaError[]
}

export class SchemaValidator {
  constructor(private _spi: ISchemaValidatorSpi) {}

  validateConfigSchema = (json: unknown) => {
    return this._spi.validateConfigSchema(json)
  }

  validate = (json: unknown, schema: SchemaValidatorJson) => {
    return this._spi.validate(json, schema)
  }

  validateType = <T>(data: unknown, schema: SchemaValidatorJson): data is T => {
    return this.validate(data, schema).length === 0
  }
}
