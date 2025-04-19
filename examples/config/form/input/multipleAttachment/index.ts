import type { Config } from '/src'

export const configFormInputMultipleAttachment: Config = {
  name: 'App with a form with a multiple attachment input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'multiple_attachment',
          label: 'Multiple Attachment',
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
