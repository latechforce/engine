import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseUpdateService: Config = {
  name: 'App with a database update service',
  automations: [
    {
      name: 'updateUser',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'update-user',
        input: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
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
            name: '{{trigger.body.name}}',
          },
          code: String(async function (context: CodeRunnerContext<{ id: string; name: string }>) {
            const { inputData, services } = context
            const { name, id } = inputData
            const { database } = services
            const user = await database.table('users').update(id, { name })
            return { user }
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
