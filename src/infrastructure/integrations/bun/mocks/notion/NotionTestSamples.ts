import type { NotionUserDto } from '/adapter/spi/dtos/NotionUserDto'
import type {
  ConvertToNotionTablePageProperties,
  NotionTablePagePropertyFile,
} from '/domain/integrations/Notion'
import env from '/test/env'
import type { TableSchema } from '/adapter/api/schemas/TableSchema'

export type NotionTableSample1 = ConvertToNotionTablePageProperties<{
  name?: string | null
  number?: number | string | null
  boolean?: boolean | string | null
  text?: string | null
  url?: string | null
  email?: string | null
  phone?: string | null
  single_select?: string | null
  status?: string | null
  multi_select?: string[]
  date?: string | null | Date | number
  people?: string[]
  files?: NotionTablePagePropertyFile[]
  single_relation?: string[]
  multi_relation?: string[]
  rollup_names?: string | null
  archived?: boolean | null
}>

export const notionTableSample1: TableSchema = {
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
    {
      name: 'people',
      type: 'MultipleSelect',
      options: ['1', '2'],
    },
    {
      name: 'files',
      type: 'MultipleAttachment',
    },
    {
      name: 'single_relation',
      type: 'SingleLinkedRecord',
      table: 'table_2',
    },
    {
      name: 'multi_relation',
      type: 'MultipleLinkedRecord',
      table: 'table_2',
    },
    {
      name: 'rollup_names',
      type: 'Rollup',
      multipleLinkedRecord: 'multi_relation',
      linkedRecordField: 'name',
      formula: "CONCAT(values, ', ')",
      output: {
        type: 'SingleLineText',
      },
    },
    {
      name: 'archived',
      type: 'Checkbox',
    },
  ],
}

export type NotionTableSample2 = ConvertToNotionTablePageProperties<{
  name?: string
}>

export const notionTableSample2: TableSchema = {
  name: 'table_2',
  fields: [
    {
      name: 'name',
      type: 'SingleLineText',
    },
  ],
}

export type NotionTableSample3 = ConvertToNotionTablePageProperties<{
  Titre?: string
  'Email de contact'?: string
  '[App] Nom'?: string
}>

export const notionTableSample3: TableSchema = {
  name: env.TEST_NOTION_TABLE_3_ID,
  fields: [
    {
      name: 'Titre',
      type: 'SingleLineText',
    },
    {
      name: 'Email de contact',
      type: 'Email',
    },
    {
      name: '[App] Nom',
      type: 'SingleLineText',
    },
  ],
}

export const notionUserSample: NotionUserDto = {
  id: '1',
  email: 'test@test.com',
  name: 'test',
  avatarUrl: 'test',
}
