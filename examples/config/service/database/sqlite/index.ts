import type { Config } from '/src'

export const sqlite: Config = {
  name: 'App with SQLite database',
  services: {
    database: {
      type: 'SQLite',
      url: '{{ env.DATABASE_URL "./tmp/database.db" }}',
    },
  },
}
