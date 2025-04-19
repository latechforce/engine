import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptEnv: Config = {
  name: 'App with a run typescript action with env',
  automations: [
    {
      name: 'runTypescriptWithEnv',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run-typescript-with-env',
        output: {
          nodeEnv: '{{runJavascriptCode.nodeEnv}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          env: {
            NODE_ENV: 'xxx',
          },
          code: String(async function (context: CodeRunnerContext) {
            const { env } = context
            const { NODE_ENV } = env
            return { nodeEnv: NODE_ENV }
          }),
        },
      ],
    },
  ],
}
