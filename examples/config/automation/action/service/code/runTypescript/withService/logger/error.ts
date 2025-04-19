import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithLoggerErrorService: Config = {
  name: 'App with a logger service with error method',
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
            logger.error('Hello World')
          }),
        },
      ],
    },
  ],
}
