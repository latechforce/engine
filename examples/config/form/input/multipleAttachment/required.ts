import type { Config } from '/src'

export const configFormInputMultipleAttachmentRequired: Config = {
  name: 'App with a form with a required multiple attachment input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'multiple_attachment',
          label: 'Multiple Attachment',
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
          name: 'multiple_attachment',
          type: 'MultipleAttachment',
        },
      ],
    },
  ],
}
