import type { Config } from '@latechforce/engine'

export const schema: Config = {
  name: 'App with a table with a schema',
  tables: [
    {
      name: 'table',
      schema: 'private',
    },
  ],
}
