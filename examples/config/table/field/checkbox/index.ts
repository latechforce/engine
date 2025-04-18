import type { Config } from '/src'

export const configTableFieldCheckbox: Config = {
  name: 'App with a table with a checkbox field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'checkbox',
          type: 'Checkbox',
        },
      ],
    },
  ],
}
