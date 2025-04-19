import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithFsExtraPackage: Config = {
  name: 'App with a run typescript action with fs-extra package',
  automations: [
    {
      name: 'fsExtra',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'fsExtra',
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
              packages: { fsExtra },
            } = context
            return { exist: !!fsExtra.copy }
          }),
        },
      ],
    },
  ],
}
