import type { Config } from '/src'

export const configTableFieldMultipleSelect: Config = {
  name: 'App with a table with a multiple select field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'multiple_select',
          type: 'MultipleSelect',
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
      ],
    },
  ],
}
