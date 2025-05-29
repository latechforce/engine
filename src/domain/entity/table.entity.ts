import type { TableSchema } from '@/types'

export class Table {
  constructor(public readonly schema: TableSchema) {}
}
