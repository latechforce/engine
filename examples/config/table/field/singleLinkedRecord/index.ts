import type { Config } from '/src'

export const configTableFieldSingleLinkedRecord: Config = {
  name: 'App with a table with a single linked record field',
  tables: [
    {
      name: 'table_1',
      fields: [
        {
          name: 'single_linked_record',
          type: 'SingleLinkedRecord',
          table: 'table_2',
        },
      ],
    },
    {
      name: 'table_2',
    },
  ],
}
