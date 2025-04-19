import type { Config } from '/src'

export const configFormInputEmailRequired: Config = {
  name: 'App with a form with a required email',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'email',
          label: 'Email',
          required: true,
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
