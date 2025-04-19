import type { Config } from '/src'

export const configTableFieldFormulaRequired: Config = {
  name: 'App with a table with a required formula field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
          required: true,
        },
        {
          name: 'formula',
          type: 'Formula',
          formula: 'single_line_text || "!"',
          output: {
            type: 'SingleLineText',
          },
          required: true,
        },
      ],
    },
  ],
}
