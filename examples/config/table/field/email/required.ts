import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required email field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'email',
          type: 'Email',
          required: true,
        },
      ],
    },
  ],
}
