import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithLoggerDebugService: Config = {
  name: 'App with a logger service with debug method',
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
            const { logger } = context.services
            logger.debug('Hello World')
          }),
        },
      ],
    },
  ],
}
