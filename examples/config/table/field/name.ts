import type { Config } from '@latechforce/engine'

export const name: Config = {
  name: 'App with a table with a named field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
        },
      ],
    },
  ],
}
