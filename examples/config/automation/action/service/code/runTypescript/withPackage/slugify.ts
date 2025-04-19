import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithSlugifyPackage: Config = {
  name: 'App with a run typescript action with slugify package',
  automations: [
    {
      name: 'slugify',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'slugify',
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
              packages: { slugify },
            } = context
            return { exist: !!slugify.extend }
          }),
        },
      ],
    },
  ],
}
