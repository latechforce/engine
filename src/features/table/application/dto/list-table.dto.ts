import type { Table } from '../../domain/entity/table.entity'

export type ListTablesDto = {
  tables: {
    id: string
    name: string
    fields: {
      id: string
      name: string
      type: string
    }[]
  }[]
}

export function toListTableDto(tables: Table[]): ListTablesDto {
  return {
    tables: tables.map((table) => ({
      id: table.schema.id.toString(),
      name: table.schema.name,
      fields: table.schema.fields.map((field) => ({
        id: field.id.toString(),
        name: field.name,
        type: field.type,
      })),
    })),
  }
}
