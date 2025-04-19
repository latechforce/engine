import type { Config } from '/src'

export const configServiceDatabaseSqlite: Config = {
  name: 'App with SQLite database',
  services: {
    database: {
      type: 'SQLite',
      url: '{{ env.DATABASE_URL "./tmp/database.db" }}',
    },
  },
}
