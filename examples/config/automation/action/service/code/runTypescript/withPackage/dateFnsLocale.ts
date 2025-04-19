import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDateFnsLocale: Config = {
  name: 'App with a run typescript action with dateFnsLocale package',
  automations: [
    {
      name: 'getDateLocale',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-date-locale',
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
              packages: { dateFnsLocale },
            } = context
            const exist = !!dateFnsLocale.fr
            return { exist }
          }),
        },
      ],
    },
  ],
}
