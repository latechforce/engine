import type { Config } from '/src'

export const configServiceDatabaseSqliteWithTable: Config = {
  name: 'App with SQLite database with a table',
  tables: [
    {
      name: 'users',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
      ],
    },
  ],
  services: {
    database: {
      type: 'SQLite',
      url: '{{ env.DATABASE_URL "./tmp/database.db" }}',
    },
  },
}
