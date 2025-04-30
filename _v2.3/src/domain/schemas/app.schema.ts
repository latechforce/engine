import type { TableSchema } from './table.schema'

export type AppSchema = {
  name: string
  tables?: TableSchema[]
}
