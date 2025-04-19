import type { Config } from '/src'

export const configTableSchema: Config = {
  name: 'App with a table with a schema',
  tables: [
    {
      name: 'table',
      schema: 'private',
    },
  ],
}
