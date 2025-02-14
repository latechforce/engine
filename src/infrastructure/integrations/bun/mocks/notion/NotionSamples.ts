import type { NotionUserDto } from '/adapter/spi/dtos/NotionUserDto'
import type { ITable } from '/domain/interfaces/ITable'
import env from '/infrastructure/test/env'

export const notionTableSample1: ITable = {
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
      name: 'multiple_relation',
      type: 'MultipleLinkedRecord',
      table: 'table_2',
    },
    {
      name: 'rollup_names',
      type: 'Rollup',
      multipleLinkedRecord: 'multiple_relation',
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

export const notionTableSample2: ITable = {
  name: 'table_2',
  fields: [
    {
      name: 'name',
      type: 'SingleLineText',
    },
  ],
}

export const notionTableSample3: ITable = {
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
