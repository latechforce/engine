import type { Config } from '/src'

export const configTableFieldMultipleAttachment: Config = {
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
