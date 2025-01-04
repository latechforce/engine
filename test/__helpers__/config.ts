import type { Config } from '@domain/interfaces'
import type { ITable } from '@domain/interfaces/ITable'

const fullConfig: Config = {
  name: 'App',
  tables: [
    {
      name: 'first_table',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'name_before_migration',
          type: 'SingleLineText',
        },
        {
          name: 'name_after_migration',
          type: 'SingleLineText',
          onMigration: {
            replace: 'name_before_migration',
          },
        },
        {
          name: 'long_text',
          type: 'LongText',
        },
        {
          name: 'date',
          type: 'DateTime',
        },
        {
          name: 'checkbox',
          type: 'Checkbox',
        },
        {
          name: 'number',
          type: 'Number',
        },
        {
          name: 'number_formula',
          type: 'Formula',
          formula: 'number * 10',
          output: {
            type: 'Number',
          },
        },
        {
          name: 'number_formula_reference',
          type: 'Formula',
          formula: 'number_formula * 10',
          output: {
            type: 'Number',
          },
        },
        {
          name: 'text_formula',
          type: 'Formula',
          formula: "'Hello ' || name",
          output: {
            type: 'SingleLineText',
          },
        },
        {
          name: 'text_formula_reference',
          type: 'Formula',
          formula: "text_formula || '!'",
          output: {
            type: 'SingleLineText',
          },
        },
        {
          name: 'single_select',
          type: 'SingleSelect',
          options: ['Red', 'Blue', 'Green'],
        },
        {
          name: 'single_linked_record',
          type: 'SingleLinkedRecord',
          table: 'second_table',
        },
        {
          name: 'multiple_linked_record',
          type: 'MultipleLinkedRecord',
          table: 'second_table',
        },
        {
          name: 'text_rollup',
          type: 'Rollup',
          multipleLinkedRecord: 'multiple_linked_record',
          linkedRecordField: 'name',
          formula: "CONCAT(values, ', ')",
          output: {
            type: 'SingleLineText',
          },
        },
        {
          name: 'number_rollup',
          type: 'Rollup',
          multipleLinkedRecord: 'multiple_linked_record',
          linkedRecordField: 'number',
          formula: 'SUM(values)',
          output: {
            type: 'Number',
          },
        },
      ],
    },
    {
      name: 'second_table',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
        {
          name: 'number',
          type: 'Number',
        },
      ],
    },
  ],
}

type FirstTableFieldName =
  | 'name'
  | 'name_before_migration'
  | 'name_after_migration'
  | 'long_text'
  | 'date'
  | 'checkbox'
  | 'number'
  | 'number_formula'
  | 'number_formula_reference'
  | 'text_formula'
  | 'text_formula_reference'
  | 'single_select'
  | 'single_linked_record'
  | 'multiple_linked_record'
  | 'text_rollup'
  | 'number_rollup'

export function getFirstTableConfig(fields: FirstTableFieldName[] = ['name']): {
  name: string
  tables: ITable[]
} {
  const firstTable = fullConfig.tables?.find((table) => table.name === 'first_table')
  if (!firstTable) {
    throw new Error('First Table not found')
  }
  return {
    name: 'First Table',
    tables: [
      {
        ...firstTable,
        fields: firstTable.fields.filter((f) => fields.includes(f.name as FirstTableFieldName)),
      },
    ],
  }
}

export function getFirstAndSecondTableConfig(fields: FirstTableFieldName[] = ['name']): {
  name: string
  tables: ITable[]
} {
  const firstTable = fullConfig.tables?.find((table) => table.name === 'first_table')
  const secondTable = fullConfig.tables?.find((table) => table.name === 'second_table')
  if (!firstTable || !secondTable) {
    throw new Error('First or Second Table not found')
  }
  return {
    name: 'First and Second Table',
    tables: [
      {
        ...firstTable,
        fields: firstTable.fields.filter((f) => fields.includes(f.name as FirstTableFieldName)),
      },
      secondTable,
    ],
  }
}
