import Ajv from 'ajv'
import type { SchemaObject } from 'ajv'
import { injectable } from 'inversify'

@injectable()
export class SchemaService {
  private ajv: Ajv

  constructor() {
    this.ajv = new Ajv()
    this.ajv.addKeyword({
      keyword: 'fileType',
      type: 'object',
      errors: true,
      validate: function fileTypeValidator(_schema: boolean, data: unknown) {
        if (typeof File !== 'undefined' && data instanceof File) {
          return true
        } else {
          ;(fileTypeValidator as unknown as { errors: unknown[] }).errors = [
            {
              keyword: 'fileType',
              message: 'should be a File object',
            },
          ]
          return false
        }
      },
    })
  }

  validate(schema: SchemaObject, data: unknown): boolean {
    return this.ajv.validate(schema, data)
  }
}
