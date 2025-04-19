import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseInsertManyService: Config = {
  name: 'App with a database insert many service',
  tables: [{ name: 'users', fields: [{ name: 'name', type: 'SingleLineText' }] }],
  automations: [
    {
      name: 'createUsers',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'create-users',
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
            const users = await database.table('users').insertMany([{ name }, { name }])
            return { users }
          }),
        },
      ],
    },
  ],
}
