import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required long text field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'long_text',
          type: 'LongText',
          required: true,
        },
      ],
    },
  ],
}
