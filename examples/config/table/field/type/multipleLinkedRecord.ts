import type { Config } from '@latechforce/engine'

export const multipleLinkedRecord: Config = {
  name: 'App with a table with a multiple linked record field',
  tables: [
    {
      name: 'table_1',
      fields: [
        {
          name: 'multiple_linked_record',
          type: 'MultipleLinkedRecord',
          table: 'table_2',
        },
      ],
    },
    {
      name: 'table_2',
    },
  ],
}
