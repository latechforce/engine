import type { Config } from '/src'

export const configFormInputSingleSelect: Config = {
  name: 'App with a form with a single select input',
  forms: [
    {
      name: 'form',
      path: 'path',
      table: 'table',
      inputs: [
        {
          field: 'single_select',
          label: 'Single Select',
        },
      ],
    },
  ],
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
