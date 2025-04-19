import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithNotionPackage: Config = {
  name: 'App with a run typescript action with Notion package',
  automations: [
    {
      name: 'notion',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'notion',
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
              packages: { Notion },
            } = context
            return { exist: !!new Notion() }
          }),
        },
      ],
    },
  ],
}
