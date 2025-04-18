import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required checkbox field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'checkbox',
          type: 'Checkbox',
          required: true,
        },
      ],
    },
  ],
}
