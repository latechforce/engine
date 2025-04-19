import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseReadService: Config = {
  name: 'App with a database service with read method',
  automations: [
    {
      name: 'readUser',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'read-user',
        input: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        output: {
          user: {
            json: '{{runJavascriptCode.user}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          input: {
            id: '{{trigger.body.id}}',
          },
          code: String(async function (context: CodeRunnerContext<{ id: string }>) {
            const { inputData, services } = context
            const { database } = services
            const { id } = inputData
            type User = { name: string }
            const user = await database.table<User>('users').read({
              field: 'id',
              operator: 'Is',
              value: id,
            })
            return { user: user?.fields }
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
