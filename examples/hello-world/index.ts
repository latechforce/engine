import type { Config, CodeRunnerContext } from '@latechforce/engine'
import App from '@latechforce/engine/bun'

const config: Config = {
  name: 'App',
  version: '1.0.0',
  automations: [
    {
      name: 'helloName',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'hello-name',
        input: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
        output: {
          message: '{{runJavascriptCode.message}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          input: {
            name: '{{trigger.body.name}}',
          },
          code: String(async function (context: CodeRunnerContext<{ name: string }>) {
            const { name } = context.inputData
            return { message: `Hello ${name}!` }
          }),
        },
      ],
    },
  ],
  server: {
    port: 3000,
  },
}

await new App().start(config)
