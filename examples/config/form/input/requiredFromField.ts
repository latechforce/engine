import type { Config } from '/src'

export const requiredFromField: Config = {
  name: 'App with a form with a required input from a field',
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
          required: true,
        },
      ],
    },
  ],
}
