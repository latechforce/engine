import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithPapaparsePackage: Config = {
  name: 'App with a run typescript action with papaparse package',
  automations: [
    {
      name: 'papaparse',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'papaparse',
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
              packages: { papaparse },
            } = context
            return { exist: !!papaparse.parse }
          }),
        },
      ],
    },
  ],
}
