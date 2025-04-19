import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithAxiosPackage: Config = {
  name: 'App with a run typescript action with axios package',
  automations: [
    {
      name: 'axios',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'axios',
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
              packages: { axios },
            } = context
            return { exist: !!axios?.post }
          }),
        },
      ],
    },
  ],
}
