import type { Field } from '../entity/field.entity'

export type IFieldRepository = {
  debug(message: string): void
  setup(field: Field): Promise<void>
}
