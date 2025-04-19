import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseUpdateManyService: Config = {
  name: 'App with a database update many service',
  automations: [
    {
      name: 'updateUsers',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'update-users',
        input: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
        output: {
          users: {
            json: '{{runJavascriptCode.users}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          input: {
            name: '{{trigger.body.name}}',
          },
          code: String(async function (context: CodeRunnerContext<{ name: string }>) {
            const { inputData, services } = context
            const { name } = inputData
            const { database } = services
            const users = await database.table('users').updateMany([
              { id: '1', fields: { name } },
              { id: '2', fields: { name } },
            ])
            return { users }
          }),
        },
      ],
    },
  ],
  tables: [
    {
      name: 'users',
      fields: [{ name: 'name', type: 'SingleLineText' }],
    },
  ],
}
