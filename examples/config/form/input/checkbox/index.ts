import type { Config } from '/src'

export const configFormInputCheckbox: Config = {
  name: 'App with a checkbox input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'checkbox',
          label: 'Checkbox',
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
