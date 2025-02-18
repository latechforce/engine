import type { Config, CodeRunnerContext } from '@latechforce/engine'
import App from '@latechforce/engine/bun'

const config: Config = {
  name: 'Hello World Example',
  version: '1.0.0',
  automations: [
    {
      name: 'helloWorld',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'hello-world',
        input: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
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
          code: String(async function (context: CodeRunnerContext<{ name?: string }>) {
            const { name = 'world' } = context.inputData
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
