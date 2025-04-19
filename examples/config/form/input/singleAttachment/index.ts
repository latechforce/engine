import type { Config } from '/src'

export const configFormInputSingleAttachment: Config = {
  name: 'App with a form with a single attachment input',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'single_attachment',
          label: 'Single Attachment',
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
