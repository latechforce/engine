import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'

export const configAutomationActionServiceCodeRunTypescriptWithNotionListAllUsersIntegration: Config =
  {
    name: 'App with a run typescript action with a Notion integration with list all users method',
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
              const { integrations } = context
              const { notion } = integrations
              const users = await notion.listAllUsers('notion')
              return { users }
            }),
          },
        ],
      },
    ],
  }
