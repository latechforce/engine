import type { Config } from '/src'

export const singleAttachment: Config = {
  name: 'App with a table with a single attachment field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_attachment',
          type: 'SingleAttachment',
        },
      ],
    },
  ],
}
