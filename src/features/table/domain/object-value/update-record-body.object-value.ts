import type { Fields } from './fields.object-value'

export type UpdateRecordBody = { fields: Fields }

export type MultipleUpdateRecordBody = {
  records: {
    id: string
    fields: Fields
  }[]
}
