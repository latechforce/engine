import type { FieldSchema } from '@/types'

export class Field {
  constructor(public readonly schema: FieldSchema) {}

  get name() {
    return this.schema.name
  }
}
