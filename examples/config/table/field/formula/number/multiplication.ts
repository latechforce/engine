import type { Config } from '/src'

export const configTableFieldFormulaNumberMultiplication: Config = {
  name: 'App with a table with a formula field as a number and an multiplication',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'number',
          type: 'Number',
        },
        {
          name: 'formula',
          type: 'Formula',
          formula: 'number * 10',
          output: {
            type: 'Number',
          },
        },
      ],
    },
  ],
}
