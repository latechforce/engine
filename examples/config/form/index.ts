import type { Config } from '/src'

export const configForm: Config = {
  name: 'App with a form',
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
        },
      ],
    },
  ],
}
