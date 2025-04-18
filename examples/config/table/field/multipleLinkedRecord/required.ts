import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required multiple linked record field',
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
      ],
    },
    {
      name: 'table_2',
    },
  ],
}
