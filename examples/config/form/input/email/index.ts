import type { Config } from '/src'

export const configFormInputEmail: Config = {
  name: 'App with a form with an email input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'email',
          label: 'Email',
        },
      ],
    },
  ],
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
