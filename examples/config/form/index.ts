import type { Config } from '/src'

export const form: Config = {
  name: 'App with a form',
  forms: [
    {
      name: 'user',
      path: '/user',
      table: 'users',
      inputs: [
        {
          field: 'name',
          label: 'Name',
        },
      ],
    },
  ],
  tables: [
    {
      name: 'users',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
      ],
    },
  ],
}
