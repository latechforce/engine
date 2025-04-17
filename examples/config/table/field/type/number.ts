import type { Config } from '@latechforce/engine'

export const number: Config = {
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
