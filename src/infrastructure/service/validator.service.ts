import Ajv from 'ajv'
import type { JSONSchema7 } from 'json-schema'
import { injectable } from 'inversify'

@injectable()
export class ValidatorService {
  private ajv: Ajv

  constructor() {
    this.ajv = new Ajv()
  }

  validate(schema: JSONSchema7, data: unknown): boolean {
    return this.ajv.validate(schema, data)
  }
}
