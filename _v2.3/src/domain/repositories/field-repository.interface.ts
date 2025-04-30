import type { FieldItem } from '../value-objects/field-item.value-object'

export type IFieldRepository = {
  insert: (item: FieldItem) => Promise<void>
  update: (item: FieldItem) => Promise<void>
  delete: (id: number) => Promise<void>
  findById: (id: number) => Promise<FieldItem>
  findAll: () => Promise<FieldItem[]>
}
