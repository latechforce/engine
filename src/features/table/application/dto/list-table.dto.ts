import type { Table } from '../../domain/entity/table.entity'
import type { FieldSchema } from '../../domain/schema/field'
import { toInputDtoFromFieldSchema } from '../../../form/application/dto/input.dto'
import type { InputDto } from '../../../form/application/dto/input.dto'

export type ListTablesDto = {
  tables: {
    id: string
    name: string
    fields: {
      id: string
      name: string
      type: FieldSchema['type']
    }[]
    inputs: InputDto[]
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
        required: field.required ?? false,
      })),
      inputs: table.schema.fields.map((field) => toInputDtoFromFieldSchema(field)),
    })),
  }
}
