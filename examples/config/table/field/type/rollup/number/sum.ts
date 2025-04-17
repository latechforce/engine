import type { Config } from '@latechforce/engine'

export const sum: Config = {
  name: 'App with a table with a rollup field as a number and a SUM formula',
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
          linkedRecordField: 'number',
          formula: 'SUM(values)',
          output: {
            type: 'Number',
          },
        },
      ],
    },
    {
      name: 'table_2',
      fields: [
        {
          name: 'number',
          type: 'Number',
        },
      ],
    },
  ],
}
