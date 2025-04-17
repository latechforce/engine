import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required multiple select field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'multiple_select',
          type: 'MultipleSelect',
          options: ['Option 1', 'Option 2', 'Option 3'],
          required: true,
        },
      ],
    },
  ],
}
