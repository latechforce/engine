import type { Config } from '/src'

export const name: Config = {
  name: 'App with a table with a named field',
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
