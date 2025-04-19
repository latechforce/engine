import type { Config } from '/src'

export const configTableFieldSingleLineTextRequired: Config = {
  name: 'App with a table with a required single line text field',
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
