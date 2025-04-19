import type { Config } from '/src'

export const configFormInputSingleAttachmentRequired: Config = {
  name: 'App with a form with a required single attachment input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'single_attachment',
          label: 'Single Attachment',
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
          name: 'single_attachment',
          type: 'SingleAttachment',
        },
      ],
    },
  ],
}
