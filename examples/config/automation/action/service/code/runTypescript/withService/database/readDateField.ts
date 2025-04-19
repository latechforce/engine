import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseReadDateFieldService: Config =
  {
    name: 'App with a database read date field service',
    tables: [
      {
        name: 'users',
        fields: [{ name: 'birthdate', type: 'DateTime' }],
      },
    ],
    automations: [
      {
        name: 'readBirthdate',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'read-birthdate',
          input: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
          output: {
            birthdate: '{{runJavascriptCode.birthdate}}',
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
              const user = await database.table('users').readById(id)
              return { birthdate: user?.getFieldAsDate('birthdate')?.toISOString() }
            }),
          },
        ],
      },
    ],
  }
