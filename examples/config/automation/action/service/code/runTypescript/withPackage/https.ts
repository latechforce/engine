import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithHttps: Config = {
  name: 'App with a run typescript action with https package',
  automations: [
    {
      name: 'https',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'https',
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
              packages: { https },
            } = context
            return { exist: !!https?.globalAgent }
          }),
        },
      ],
    },
  ],
}
