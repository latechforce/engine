import type { Config } from '/src'

export const configTableFieldLongText: Config = {
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
