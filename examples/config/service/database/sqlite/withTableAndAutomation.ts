import type { Config } from '/src'

export const withTableAndAutomation: Config = {
  name: 'App with SQLite database with a table and an automation',
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
      type: 'SQLite',
      url: '{{ env.DATABASE_URL "./tmp/database.db" }}',
    },
  },
}
