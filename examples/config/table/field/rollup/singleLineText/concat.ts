import type { Config } from '/src'

export const configTableFieldRollupSingleLineTextConcat: Config = {
  name: 'App with a table with a rollup field as a single line text and a CONCAT formula',
  tables: [
    {
      name: 'table_1',
      fields: [
        {
          name: 'multiple_linked_record',
          type: 'MultipleLinkedRecord',
          table: 'table_2',
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
      ],
    },
  ],
}
