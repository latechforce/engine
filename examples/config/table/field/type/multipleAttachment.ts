import type { Config } from '@latechforce/engine'

export const multipleAttachment: Config = {
  name: 'App with a table with a multiple attachment field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'multiple_attachment',
          type: 'MultipleAttachment',
        },
      ],
    },
  ],
}
