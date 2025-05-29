import type { FormSchema } from '@/domain/schema/form.schema'

export class Form {
  constructor(public readonly schema: FormSchema) {}

  get path() {
    return this.schema.path.replace(/^\//, '')
  }
}
