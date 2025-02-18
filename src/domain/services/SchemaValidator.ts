import type { SchemaError } from '/domain/entities/Error/Schema'

type JSONSchemaType = 'string' | 'number' | 'boolean' | 'array' | 'object'

export interface JSONSchemaProperties {
  [key: string]: JSONSchema
}

export interface JSONSchema {
  type?: JSONSchemaType
  properties?: JSONSchemaProperties
  enum?: string[]
  items?: JSONSchema
  required?: string[]
  additionalProperties?: boolean
  oneOf?: JSONSchema[]
}

export interface ISchemaValidatorSpi {
  validateAppSchema(json: unknown): SchemaError[]
  validate(json: unknown, schema: JSONSchema): SchemaError[]
}

export class SchemaValidator {
  constructor(private _spi: ISchemaValidatorSpi) {}

  validateAppSchema = (json: unknown) => {
    return this._spi.validateAppSchema(json)
  }

  validate = (json: unknown, schema: JSONSchema) => {
    return this._spi.validate(json, schema)
  }
}
