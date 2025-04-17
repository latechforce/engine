import type { Config } from '@latechforce/engine'

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
