import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithFetcherGetService: Config = {
  name: 'App with a fetcher service with get method',
  automations: [
    {
      name: 'fetcherGet',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'fetcher-get',
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function (context: CodeRunnerContext) {
            const { fetcher } = context.services
            await fetcher.get('https://example.com/')
          }),
        },
      ],
    },
  ],
}
