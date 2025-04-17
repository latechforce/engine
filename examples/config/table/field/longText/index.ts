import type { Config } from '/src'

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
