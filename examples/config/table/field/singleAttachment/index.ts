import type { Config } from '/src'

export const configTableFieldSingleAttachment: Config = {
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
