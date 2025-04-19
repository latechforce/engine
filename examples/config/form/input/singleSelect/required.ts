import type { Config } from '/src'

export const configFormInputSingleSelectRequired: Config = {
  name: 'App with a form with a required single select input',
  forms: [
    {
      name: 'form',
      path: 'path',
      table: 'table',
      inputs: [
        {
          field: 'single_select',
          label: 'Single Select',
          required: true,
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
