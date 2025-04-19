import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithMistral: Config = {
  name: 'App with a run typescript action with MistralAI package',
  automations: [
    {
      name: 'mistral',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'mistral',
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
              packages: { Mistral },
            } = context
            const mistral = new Mistral()
            return { exist: !!mistral.chat }
          }),
        },
      ],
    },
  ],
}
