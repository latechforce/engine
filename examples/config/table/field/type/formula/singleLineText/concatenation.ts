import type { Config } from '@latechforce/engine'

export const concatenation: Config = {
  name: 'App with a table with a formula field as a single line text and an concatenation',
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
