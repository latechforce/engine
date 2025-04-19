import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithSodiumPackage: Config = {
  name: 'App with a run typescript action with sodium package',
  automations: [
    {
      name: 'sodium',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'sodium',
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
              packages: { sodium },
            } = context
            return { exist: !!sodium.ready }
          }),
        },
      ],
    },
  ],
}
