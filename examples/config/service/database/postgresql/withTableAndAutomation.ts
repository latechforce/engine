import type { Config } from '/src'

export const configServiceDatabasePostgresqlWithTableAndAutomation: Config = {
  name: 'App with PostgreSQL database with a table and an automation',
  automations: [
    {
      name: 'onUserCreated',
      trigger: {
        service: 'Database',
        event: 'RecordCreated',
        table: 'users',
      },
      actions: [],
    },
  ],
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
