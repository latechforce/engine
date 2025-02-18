import type { ISchemaValidatorSpi, JSONSchema } from '/domain/services/SchemaValidator'
import type { SchemaErrorDto } from '../dtos/ErrorDto'
import { ErrorMapper } from '../mappers/ErrorMapper'

export interface ISchemaValidatorDriver {
  validateAppSchema(json: unknown): SchemaErrorDto[]
  validate(json: unknown, schema: JSONSchema): SchemaErrorDto[]
}

export class SchemaValidatorSpi implements ISchemaValidatorSpi {
  constructor(private _driver: ISchemaValidatorDriver) {}

  validateAppSchema = (json: unknown) => {
    const errors = this._driver.validateAppSchema(json)
    return ErrorMapper.toManySchemaEntities(errors)
  }

  validate = (json: unknown, schema: JSONSchema) => {
    const errors = this._driver.validate(json, schema)
    return ErrorMapper.toManySchemaEntities(errors)
  }
}
