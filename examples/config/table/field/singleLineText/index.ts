import type { Config } from '/src'

export const singleLineText: Config = {
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
