import type { Config } from '@latechforce/engine'

export const required: Config = {
  name: 'App with a table with a required field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
          required: true,
        },
      ],
    },
  ],
}
