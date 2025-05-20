import type { Table } from '@/domain/entity/table.entity'

export type ITableRepository = {
  debug(message: string): void
  setup(table: Table): Promise<void>
}
