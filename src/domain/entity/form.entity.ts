import type { FormSchema } from '@/domain/validator/form.validator'

export class Form {
  constructor(public readonly schema: FormSchema) {}

  get path() {
    return `/forms/${this.schema.path.replace(/^\//, '')}`
  }
}
