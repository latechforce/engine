import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseInsertService: Config = {
  name: 'App with a database service with insert method',
  automations: [
    {
      name: 'createUser',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'create-user',
        input: {
          type: 'object',
          properties: {
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
            name: '{{trigger.body.name}}',
          },
          code: String(async function (context: CodeRunnerContext<{ name: string }>) {
            const { name } = context.inputData
            const { database } = context.services
            const user = await database.table('users').insert({ name })
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
