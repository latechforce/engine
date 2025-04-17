import type { Config } from '/src'

export const required: Config = {
  name: 'App with a table with a required single attachment field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_attachment',
          type: 'SingleAttachment',
          required: true,
        },
      ],
    },
  ],
}
