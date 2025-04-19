import type { Config } from '/src'

export const configFormInputRequiredFromField: Config = {
  name: 'App with a form with a required input from a field',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'single_line_text',
          label: 'Single Line Text',
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
          required: true,
        },
      ],
    },
  ],
}
