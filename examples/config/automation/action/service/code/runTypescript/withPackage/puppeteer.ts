import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithPuppeteer: Config = {
  name: 'App with a run typescript action with puppeteer package',
  automations: [
    {
      name: 'puppeteer',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'puppeteer',
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
              packages: { puppeteer },
            } = context
            return { exist: !!puppeteer.launch }
          }),
        },
      ],
    },
  ],
}
