import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithFetcherPostService: Config = {
  name: 'App with a fetcher service with post method',
  automations: [
    {
      name: 'fetcherPost',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'fetcher-post',
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function (context: CodeRunnerContext) {
            const { fetcher } = context.services
            await fetcher.post(
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
