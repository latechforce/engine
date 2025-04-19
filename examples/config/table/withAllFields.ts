import type { Config } from '/src'

export const configTableWithAllFields: Config = {
  name: 'App with tables with all fields',
  tables: [
    {
      name: 'table_1',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
        },
        {
          name: 'long_text',
          type: 'LongText',
        },
        {
          name: 'date_time',
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
          name: 'multiple_select',
          type: 'MultipleSelect',
          options: ['Red', 'Blue', 'Green'],
        },
        {
          name: 'single_linked_record',
          type: 'SingleLinkedRecord',
          table: 'table_2',
        },
        {
          name: 'multiple_linked_record',
          type: 'MultipleLinkedRecord',
          table: 'table_2',
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
          name: 'single_attachment',
          type: 'SingleAttachment',
        },
        {
          name: 'multiple_attachment',
          type: 'MultipleAttachment',
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
        {
          name: 'Champs avec charactères (spéciaux)',
          type: 'SingleLineText',
        },
        {
          name: 'email',
          type: 'Email',
        },
        {
          name: 'url',
          type: 'Url',
        },
      ],
    },
    {
      name: 'table_2',
      fields: [
        {
          name: 'single_line_text',
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
