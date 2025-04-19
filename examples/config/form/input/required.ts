import type { Config } from '/src'

export const required: Config = {
  name: 'App with a form with a required input',
  forms: [
    {
      name: 'user',
      path: '/user',
      table: 'users',
      inputs: [
        {
          field: 'name',
          label: 'Name',
          required: true,
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
