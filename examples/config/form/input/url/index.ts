import type { Config } from '/src'

export const configFormInputUrl: Config = {
  name: 'App with a form with a url input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'url',
          label: 'Url',
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
