import type { Config } from '/src'

export const configFormInputLongTextMinLength: Config = {
  name: 'App with a form with a long text input with a min length',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'long_text',
          label: 'Long Text',
          minLength: 5,
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
