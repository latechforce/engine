import type { Config } from '/src'

export const description: Config = {
  name: 'App with a form with a description',
  forms: [
    {
      name: 'user',
      path: '/user',
      description: 'Form description',
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
