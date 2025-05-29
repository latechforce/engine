import type { FormSchema } from '@/domain/schema/form.schema'
import { Input } from './input.entity'

export class Form {
  public readonly inputs: Input[] = []

  constructor(public readonly schema: FormSchema) {
    this.inputs = schema.inputs.map((input) => new Input(input))
  }

  get path() {
    return this.schema.path.replace(/^\//, '')
  }
}
