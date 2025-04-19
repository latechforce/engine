import type { Config } from '/src'

export const successMessage: Config = {
  name: 'App with a form with a success message',
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
      successMessage: 'Success',
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
