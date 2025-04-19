import type { Config } from '/src'

export const title: Config = {
  name: 'App with a form with a title',
  forms: [
    {
      name: 'user',
      path: '/user',
      title: 'Form title',
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
