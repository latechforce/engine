import type { Config } from '/src'

export const configFormInputUrlRequired: Config = {
  name: 'App with a form with a required url input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'url',
          label: 'Url',
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
          name: 'url',
          type: 'Url',
        },
      ],
    },
  ],
}
