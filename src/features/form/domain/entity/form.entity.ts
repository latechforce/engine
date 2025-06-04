import type { FormSchema } from '../schema/form.schema'
import type { InputSchema } from '../schema/input'

export class Form {
  constructor(public readonly schema: FormSchema) {}

  get path() {
    return this.schema.path.replace(/^\//, '')
  }

  findInput(name: string): InputSchema | undefined {
    return this.schema.inputs.find((input) => input.name === name)
  }
}
