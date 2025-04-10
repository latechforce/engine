import type { ConvertToAirtableTableRecordFields } from '/domain/integrations/Airtable'
import type { ITable } from '/domain/interfaces/ITable'

export type AirtableTableSample1 = ConvertToAirtableTableRecordFields<{
  name?: string | null
  number?: number | null
  boolean?: boolean | null
  text?: string | null
  url?: string | null
  email?: string | null
  phone?: string | null
  single_select?: string | null
  status?: string | null
  multi_select?: string[]
  date?: string | null | Date | number
}>

export const airtableTableSample1: ITable = {
  name: 'table_1',
  fields: [
    {
      name: 'name',
      type: 'SingleLineText',
    },
    {
      name: 'number',
      type: 'Number',
    },
    {
      name: 'boolean',
      type: 'Checkbox',
    },
    {
      name: 'text',
      type: 'SingleLineText',
    },
    {
      name: 'url',
      type: 'SingleLineText',
    },
    {
      name: 'email',
      type: 'SingleLineText',
    },
    {
      name: 'phone',
      type: 'SingleLineText',
    },
    {
      name: 'single_select',
      type: 'SingleSelect',
      options: ['2', '1'],
    },
    {
      name: 'status',
      type: 'SingleSelect',
      options: ['Pas commencé', 'En cours', 'Terminé'],
    },
    {
      name: 'multi_select',
      type: 'MultipleSelect',
      options: ['4', '3', '2', '1'],
    },
    {
      name: 'date',
      type: 'DateTime',
    },
  ],
}

export type AirtableTableSample2 = ConvertToAirtableTableRecordFields<{
  name?: string | null
}>

export const airtableTableSample2: ITable = {
  name: 'table_2',
  fields: [
    {
      name: 'name',
      type: 'SingleLineText',
    },
  ],
}
