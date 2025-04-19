import type { Config } from '/src'

export const configFormInputSingleLineTextMinLength: Config = {
  name: 'App with a form with a single line text input with a min length',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'single_line_text',
          label: 'Single Line Text',
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
          name: 'single_line_text',
          type: 'SingleLineText',
        },
      ],
    },
  ],
}
