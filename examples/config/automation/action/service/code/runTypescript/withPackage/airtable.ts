import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithAirtable: Config = {
  name: 'App with a run typescript action with Airtable package',
  automations: [
    {
      name: 'airtable',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'airtable',
        output: {
          exist: {
            boolean: '{{runJavascriptCode.exist}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function (context: CodeRunnerContext) {
            const {
              packages: { Airtable },
            } = context
            return { exist: !!Airtable.base }
          }),
        },
      ],
    },
  ],
}
