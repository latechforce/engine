import type { Config } from '/src'

export const email: Config = {
  name: 'App with a table with an email field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'email',
          type: 'Email',
        },
      ],
    },
  ],
}
