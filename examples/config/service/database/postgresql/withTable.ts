import type { Config } from '/src'

export const configServiceDatabasePostgresqlWithTable: Config = {
  name: 'App with PostgreSQL database with a table',
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
      type: 'PostgreSQL',
      url: '{{ env.DATABASE_URL "postgresql://postgres:postgres@localhost:5432/postgres" }}',
    },
  },
}
