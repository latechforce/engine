import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithFetcherPutService: Config = {
  name: 'App with a fetcher service with put method',
  automations: [
    {
      name: 'fetcherPut',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'fetcher-put',
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function (context: CodeRunnerContext) {
            const { fetcher } = context.services
            await fetcher.put(
              'https://example.com/',
              { name: 'Joe' },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
          }),
        },
      ],
    },
  ],
}
