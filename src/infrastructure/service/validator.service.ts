import Ajv from 'ajv'
import type { JSONSchema7 } from 'json-schema'
import metaSchema from 'ajv/lib/refs/json-schema-draft-07.json'

export class ValidatorService {
  private ajv: Ajv

  constructor() {
    this.ajv = new Ajv({ meta: false })
    this.ajv.addMetaSchema(metaSchema)
  }

  validate(schema: JSONSchema7, data: unknown): boolean {
    return this.ajv.validate(schema, data)
  }

  validateMetaSchema(schema: unknown): boolean {
    return this.ajv.validate(metaSchema, schema)
  }
}

export const validatorService = new ValidatorService()
