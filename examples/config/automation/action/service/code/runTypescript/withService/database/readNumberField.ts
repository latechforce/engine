import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseReadNumberFieldService: Config =
  {
    name: 'App with a database service with read number field method',
    automations: [
      {
        name: 'readAge',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'read-age',
          input: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
          output: {
            age: {
              number: '{{runJavascriptCode.age}}',
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
              const user = await database.table('users').readById(id)
              return { age: user?.getFieldAsNumber('age') }
            }),
          },
        ],
      },
    ],
    tables: [
      {
        name: 'users',
        fields: [{ name: 'age', type: 'Number' }],
      },
    ],
  }
