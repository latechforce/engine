import type { Column } from '../entity/column.entity'

export type IColumnRepository = {
  debug(message: string): void
  setup(field: Column): Promise<void>
}
