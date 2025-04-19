import type { Config } from '/src'

export const configFormInputCheckboxRequired: Config = {
  name: 'App with a form with a required checkbox',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'checkbox',
          label: 'Checkbox',
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
          name: 'checkbox',
          type: 'Checkbox',
        },
      ],
    },
  ],
}
