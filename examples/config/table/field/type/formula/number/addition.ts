import type { Config } from '@latechforce/engine'

export const addition: Config = {
  name: 'App with a table with a formula field as a number and an addition',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'number',
          type: 'Number',
        },
        {
          name: 'formula',
          type: 'Formula',
          formula: 'number + 1',
          output: {
            type: 'Number',
          },
        },
      ],
    },
  ],
}
