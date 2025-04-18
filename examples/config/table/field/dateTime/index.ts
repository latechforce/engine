import type { Config } from '/src'

export const dateTime: Config = {
  name: 'App with a table with a date time field',
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'date_time',
          type: 'DateTime',
        },
      ],
    },
  ],
}
