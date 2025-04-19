import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseListWithIsAnyOfFilterService: Config =
  {
    name: 'App with a database service with list with is any of filter method',
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
              const users = await database.table('users').list({
                field: 'id',
                operator: 'IsAnyOf',
                value: ['3', '2'],
              })
              return { users: users.map((user) => user.fields) }
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
