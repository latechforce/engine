import type { Fields } from './fields.object-value'

type SingleCreateRecordBody = { fields: Fields }
type MultipleCreateRecordBody = { records: SingleCreateRecordBody[] }

export type CreateRecordBody = SingleCreateRecordBody | MultipleCreateRecordBody
