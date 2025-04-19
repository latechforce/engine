import type { Config } from '/src'

export const configAutomationActionServiceDatabaseReadRecord: Config = {
  name: 'App with a database read record action',
  automations: [
    {
      name: 'readRecord',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'read-record',
        input: {
          type: 'object',
          properties: {
            recordId: {
              type: 'string',
            },
          },
        },
        output: {
          record: {
            json: '{{readRecord.record}}',
          },
        },
      },
      actions: [
        {
          service: 'Database',
          action: 'ReadRecord',
          name: 'readRecord',
          table: 'records',
          id: '{{trigger.body.recordId}}',
        },
      ],
    },
  ],
  tables: [
    {
      name: 'records',
      fields: [],
    },
  ],
}
