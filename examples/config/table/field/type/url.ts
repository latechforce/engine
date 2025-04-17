import type { Config } from '@latechforce/engine'

export const url: Config = {
  name: 'App with a table with a url field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'url',
          type: 'Url',
        },
      ],
    },
  ],
}
