import type { Config } from '/src'

export const configTableFieldDateTimeRequired: Config = {
  name: 'App with a table with a required date time field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'date_time',
          type: 'DateTime',
          required: true,
        },
      ],
    },
  ],
}
