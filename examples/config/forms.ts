import type { Config } from '/src'

export const configForms: Config = {
  name: 'App with forms',
  forms: [
    {
      name: 'form_1',
      path: '/form_1',
      table: 'table_1',
      inputs: [
        {
          field: 'field_1',
          label: 'Field 1',
        },
      ],
    },
    {
      name: 'form_2',
      path: '/form_2',
      table: 'table_2',
      inputs: [
        {
          field: 'field_2',
          label: 'Field 2',
        },
      ],
    },
  ],
  tables: [
    {
      name: 'table_1',
      fields: [
        {
          name: 'field_1',
          type: 'SingleLineText',
        },
      ],
    },
    {
      name: 'table_2',
      fields: [
        {
          name: 'field_2',
          type: 'SingleLineText',
        },
      ],
    },
  ],
}
