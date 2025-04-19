import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseListService: Config = {
  name: 'App with a database list service',
  tables: [
    {
      name: 'users',
      fields: [{ name: 'name', type: 'SingleLineText' }],
    },
  ],
  automations: [
    {
      name: 'listUsers',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'list-users',
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
          code: String(async function (context: CodeRunnerContext) {
            const { database } = context.services
            type User = { name: string }
            const users = await database.table<User>('users').list()
            return { users: users.map((user) => user.fields) }
          }),
        },
      ],
    },
  ],
}
