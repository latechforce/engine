import type { ColumnSchema } from '@/types'

export class Column {
  constructor(public readonly schema: ColumnSchema) {}
}
