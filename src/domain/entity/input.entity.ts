import type { InputSchema } from '../validator/input'

export class Input {
  constructor(public readonly schema: InputSchema) {}
}
