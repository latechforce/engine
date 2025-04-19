import type { Config } from '/src'

export const configFormInputLongText: Config = {
  name: 'App with a form with a long text input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'long_text',
          label: 'Long Text',
        },
      ],
    },
  ],
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'long_text',
          type: 'LongText',
        },
      ],
    },
  ],
}
