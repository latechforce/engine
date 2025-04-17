import type { Config } from '/src'

export const checkbox: Config = {
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
