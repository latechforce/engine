import type { Config } from '@latechforce/engine'

export const longText: Config = {
  name: 'App with a table with a long text field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'long_text',
          type: 'LongText',
        },
      ],
    },
  ],
}
