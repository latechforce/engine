import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required single linked record field',
  tables: [
    {
      name: 'table_1',
      fields: [
        {
          name: 'single_linked_record',
          type: 'SingleLinkedRecord',
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
