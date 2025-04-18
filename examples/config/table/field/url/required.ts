import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required url field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'url',
          type: 'Url',
          required: true,
        },
      ],
    },
  ],
}
