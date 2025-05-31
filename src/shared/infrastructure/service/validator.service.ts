import Ajv from 'ajv'
import type { SchemaObject } from 'ajv'
import { injectable } from 'inversify'

@injectable()
export class SchemaService {
  private ajv: Ajv

  constructor() {
    this.ajv = new Ajv()
  }

  validate(schema: SchemaObject, data: unknown): boolean {
    return this.ajv.validate(schema, data)
  }
}
