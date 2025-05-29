import type { Table } from '@/table/domain/entity/table.entity'

export type ITableRepository = {
  debug(message: string): void
  setup(table: Table): Promise<void>
}
