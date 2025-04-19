import type { Config } from '/src'

export const configTableFieldRollupRequired: Config = {
  name: 'App with a table with a required rollup field',
  tables: [
    {
      name: 'table_1',
      fields: [
        {
          name: 'multiple_linked_record',
          type: 'MultipleLinkedRecord',
          table: 'table_2',
          required: true,
        },
        {
          name: 'rollup',
          type: 'Rollup',
          multipleLinkedRecord: 'multiple_linked_record',
          linkedRecordField: 'single_line_text',
          formula: "CONCAT(values, ', ')",
          output: {
            type: 'SingleLineText',
          },
          required: true,
        },
      ],
    },
    {
      name: 'table_2',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
          required: true,
        },
      ],
    },
  ],
}
