import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseReadStringFieldService: Config =
  {
    name: 'App with a database service with read string field method',
    automations: [
      {
        name: 'readName',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'read-name',
          input: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
          output: {
            name: '{{runJavascriptCode.name}}',
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
              return { name: user?.getFieldAsString('name') }
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
