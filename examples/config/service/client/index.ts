import type { Config } from '/src'

export const client: Config = {
  name: 'App with client',
  forms: [
    {
      name: 'Form',
      path: '/user',
      table: 'users',
      inputs: [],
    },
  ],
  tables: [
    {
      name: 'users',
      fields: [],
    },
  ],
}
