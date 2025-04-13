import type { ISchemaValidatorSpi, SchemaValidatorJson } from '/domain/services/SchemaValidator'
import type { SchemaErrorDto } from '../dtos/ErrorDto'
import { ErrorMapper } from '../mappers/ErrorMapper'

export interface ISchemaValidatorDriver {
  validateConfigSchema(json: unknown): SchemaErrorDto[]
  validate(json: unknown, schema: SchemaValidatorJson): SchemaErrorDto[]
}

export class SchemaValidatorSpi implements ISchemaValidatorSpi {
  constructor(private _driver: ISchemaValidatorDriver) {}

  validateConfigSchema = (json: unknown) => {
    const errors = this._driver.validateConfigSchema(json)
    return ErrorMapper.toManySchemaEntities(errors)
  }

  validate = (json: unknown, schema: SchemaValidatorJson) => {
    const errors = this._driver.validate(json, schema)
    return ErrorMapper.toManySchemaEntities(errors)
  }
}
