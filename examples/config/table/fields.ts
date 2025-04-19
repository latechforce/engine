import type { Config } from '/src'

export const configTableFields: Config = {
  name: 'App with a table with a name and multiple fields',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
        },
        {
          name: 'number',
          type: 'Number',
        },
        {
          name: 'date_time',
          type: 'DateTime',
        },
      ],
    },
  ],
}
