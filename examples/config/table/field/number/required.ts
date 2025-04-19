import type { Config } from '/src'

export const configTableFieldNumberRequired: Config = {
  name: 'App with a table with a required number field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'number',
          type: 'Number',
          required: true,
        },
      ],
    },
  ],
}
