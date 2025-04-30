import type { RecordItem } from '../value-objects/record-item.value-object'

export type IRecordRepository = {
  insert: (item: RecordItem) => Promise<void>
  update: (item: RecordItem) => Promise<void>
  delete: (id: number) => Promise<void>
  findById: (id: number) => Promise<RecordItem>
  findAll: () => Promise<RecordItem[]>
}
