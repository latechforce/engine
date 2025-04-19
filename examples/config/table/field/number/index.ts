import type { Config } from '/src'

export const configTableFieldNumber: Config = {
  name: 'App with a table with a number field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'number',
          type: 'Number',
        },
      ],
    },
  ],
}
