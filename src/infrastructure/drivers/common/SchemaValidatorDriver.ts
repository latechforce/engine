import Ajv, { type ErrorObject } from 'ajv'
import appSchema from '../../../../schema/app.schema.json'
import type { ISchemaValidatorDriver } from '/adapter/spi/drivers/SchemaValidatorSpi'
import type { JSONSchema } from '/domain/services/SchemaValidator'

export class SchemaValidatorDriver implements ISchemaValidatorDriver {
  private _ajv: Ajv

  constructor() {
    this._ajv = new Ajv({ allErrors: true, allowUnionTypes: true })
  }

  validateAppSchema = (data: unknown) => {
    const validate = this._ajv.compile(appSchema)
    if (validate(data)) return []
    return this._returnErrors(validate.errors)
  }

  validate = (data: unknown, schema: JSONSchema) => {
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
