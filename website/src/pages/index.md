---
hide_table_of_contents: true
---

# LTF Engine

> LTF Engine is a web app generator that allows you to create web apps with a simple and intuitive schema.
> It runs on Bun.
> It is designed to be used by non-technical users to create web apps.

## [Get started](/docs/intro) | [App Schema](/app-schema) | [Test Report](/test-report)

## Installation

```bash
bun init
bun add @latechforce/engine
```

## Example

```ts
import App, { type AppSchema } from '@latechforce/engine'

const schema: AppSchema = {
  automations: [
    {
      name: 'get-message',
      trigger: {
        service: 'http',
        event: 'get',
        path: '/message',
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'reply-message',
          code: String(function () {
            const message: string = 'Hello, world!'
            return { message }
          }),
        },
      ],
    },
  ],
}

const app = await new App().start(schema)

console.log(`App is available at ${app.url()}`)

/* GET /api/automation/message => { message: 'Hello, world!' } */
```
