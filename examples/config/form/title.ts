import type { Config } from '/src'

export const configFormTitle: Config = {
  name: 'App with a form with a title',
  forms: [
    {
      name: 'form',
      path: '/path',
      title: 'Form title',
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
