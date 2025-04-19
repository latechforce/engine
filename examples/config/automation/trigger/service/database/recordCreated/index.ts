import type { Config } from '/src'

export const configAutomationTriggerServiceDatabaseRecordCreated: Config = {
  name: 'App with an automation with a database record created trigger',
  automations: [
    {
      name: 'RecordCreated',
      trigger: {
        service: 'Database',
        event: 'RecordCreated',
        table: 'table_1',
      },
      actions: [],
    },
  ],
  tables: [
    {
      name: 'table_1',
      fields: [],
    },
  ],
}
