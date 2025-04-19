import type { Config } from '/src'

export const configServiceDatabasePostgresql: Config = {
  name: 'App with PostgreSQL database',
  services: {
    database: {
      type: 'PostgreSQL',
      url: '{{ env.DATABASE_URL "postgresql://postgres:postgres@localhost:5432/postgres" }}',
    },
  },
}
