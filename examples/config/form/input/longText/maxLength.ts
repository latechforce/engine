import type { Config } from '/src'

export const configFormInputLongTextMaxLength: Config = {
  name: 'App with a form with a long text input with a max length',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'long_text',
          label: 'Long Text',
          maxLength: 100,
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
