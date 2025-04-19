import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDateFnsPackage: Config = {
  name: 'App with a run typescript action with dateFns package',
  automations: [
    {
      name: 'getDate',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-date',
        output: {
          date: '{{runJavascriptCode.date}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function (context: CodeRunnerContext) {
            const {
              packages: { dateFns },
            } = context
            const date = dateFns.format(new Date(2024, 8, 1), 'yyyy-MM-dd')
            return { date }
          }),
        },
      ],
    },
  ],
}
