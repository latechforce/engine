import type { Config } from '/src'

export const configTableFieldMultipleAttachmentRequired: Config = {
  name: 'App with a table with a required multiple attachment field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'multiple_attachment',
          type: 'MultipleAttachment',
          required: true,
        },
      ],
    },
  ],
}
