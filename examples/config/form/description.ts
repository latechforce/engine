import type { Config } from '/src'

export const configFormDescription: Config = {
  name: 'App with a form with a description',
  forms: [
    {
      name: 'form',
      path: '/path',
      description: 'Form description',
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
        },
      ],
    },
  ],
}
