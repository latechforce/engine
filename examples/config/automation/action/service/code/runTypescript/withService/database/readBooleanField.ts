import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseReadBooleanFieldService: Config =
  {
    name: 'App with a database service with read boolean field method',
    automations: [
      {
        name: 'readValid',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'read-valid',
          input: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
          output: {
            valid: {
              boolean: '{{runJavascriptCode.valid}}',
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
              return { valid: user?.getFieldAsBoolean('valid') }
            }),
          },
        ],
      },
    ],
    tables: [
      {
        name: 'users',
        fields: [{ name: 'valid', type: 'Checkbox' }],
      },
    ],
  }
