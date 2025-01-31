# La Tech Force Engine - Backend Generator

La Tech Force Engine is a API to generate a backend, fast and easy. With a configuration file, you can create a full backend.

## Getting Started

### Pre-requisites

You should have Bun 1.2 or higher installed on your machine.

### Installation

In a Bun project, install the engine with Bun:

```
bun install @latechforce/engine
```

### Examples

#### Run an API

Create a new file `index.ts` with the following content:

```ts
import type { Config, CodeRunnerContext } from '@latechforce/engine'
import App from '@latechforce/engine/bun'

const config: Config = {
  name: 'App',
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
}

const startedApp = await new App().start(config)

const response = await fetch(startedApp.url + '/api/automation/hello-name', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'World' }),
})

const data = await response.json()

console.log(data.message) // Hello World!
```

## Configuration

A configuration is a JSON representation of the application. It contains the tables, automations, services, integrations, etc...

## Contributing

La Tech Force Engine is built and maintained by a small team – we'd love your help to fix bugs and add features!

You can read our [contributing guide here](https://github.com/latechforce/engine/blob/main/docs/CONTRIBUTING.md) and our [code of conduct here](https://github.com/latechforce/engine/blob/main/docs/CODE_OF_CONDUCT.md).

## License

La Tech Force Engine is [BSL 1.1 licensed](https://github.com/latechforce/engine/blob/main/LICENSE).
