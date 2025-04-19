import type { Config } from '/src'

export const configFormInputLongTextRequired: Config = {
  name: 'App with a form with a required long text input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'long_text',
          label: 'Long Text',
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
          name: 'long_text',
          type: 'LongText',
        },
      ],
    },
  ],
}
