import Ajv, { type ErrorObject } from 'ajv'
import configSchema from '../../../../schema/config.schema.json'
import type { ISchemaValidatorDriver } from '/adapter/spi/drivers/SchemaValidatorSpi'
import type { SchemaValidatorJson } from '/domain/services/SchemaValidator'

export class SchemaValidatorDriver implements ISchemaValidatorDriver {
  private _ajv: Ajv

  constructor() {
    this._ajv = new Ajv({ allErrors: true, allowUnionTypes: true })
  }

  validateConfigSchema = (data: unknown) => {
    const validate = this._ajv.compile(configSchema)
    if (validate(data)) return []
    return this._returnErrors(validate.errors)
  }

  validate = (data: unknown, schema: SchemaValidatorJson) => {
    const validate = this._ajv.compile(schema)
    if (validate(data)) return []
    return this._returnErrors(validate.errors)
  }

  private _returnErrors = (errors: ErrorObject[] | null = []) => {
    return (errors || []).map((error) => ({
      instancePath: error.instancePath,
      schemaPath: error.schemaPath,
      keyword: error.keyword,
      params: error.params,
      propertyName: error.propertyName,
      message: error.message,
    }))
  }
}
