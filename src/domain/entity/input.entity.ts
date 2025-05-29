import type { InputSchema } from '@/domain/schema/input'

export class Input {
  constructor(public readonly schema: InputSchema) {}
}
