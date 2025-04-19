import type { Config } from '/src'

export const configTableFieldFormula: Config = {
  name: 'App with a table with a formula field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
        },
        {
          name: 'formula',
          type: 'Formula',
          formula: 'single_line_text || "!"',
          output: {
            type: 'SingleLineText',
          },
        },
      ],
    },
  ],
}
