import type { Config } from '/src'

export const singleSelect: Config = {
  name: 'App with a table with a single select field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_select',
          type: 'SingleSelect',
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
      ],
    },
  ],
}
