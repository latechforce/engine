import type { Config } from '/src'

export const configTableFieldSingleLineText: Config = {
  name: 'App with a table with a single line text field',
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
