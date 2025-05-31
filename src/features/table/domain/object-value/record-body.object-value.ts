import type { Fields } from './fields.object-value'

type SingleRecordBody = { fields: Fields }
type MultipleRecordBody = { records: SingleRecordBody[] }

export type RecordBody = SingleRecordBody | MultipleRecordBody
