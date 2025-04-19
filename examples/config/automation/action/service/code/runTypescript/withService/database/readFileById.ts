import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDatabaseReadFileByIdService: Config =
  {
    name: 'App with a database service with read file by id method',
    automations: [
      {
        name: 'readFile',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'read-file',
          input: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
          output: {
            file: {
              json: '{{runJavascriptCode.file}}',
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
              const file = await database.table('users').readFileById(id)
              return { file: file?.toAttachment() }
            }),
          },
        ],
      },
    ],
    tables: [
      {
        name: 'users',
        fields: [{ name: 'attachments', type: 'MultipleAttachment' }],
      },
    ],
  }
