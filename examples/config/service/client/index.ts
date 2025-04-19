import type { Config } from '/src'

export const configServiceClient: Config = {
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
