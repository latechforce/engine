# LTF Engine is a web app generator

Build an app with database, automations, and more... all in a JSON file. LTF Engine is a web app
generator that allows you to create web apps with a simple and intuitive schema. It runs on Bun.
It is designed to be used by non-technical users to create web apps.

## 1. Install Bun

```bash
$ curl -fsSL https://bun.sh/install | bash
```

## 2. Create a new project from a template

```bash
$ bun create https://github.com/latechforce/engine-template my-fantastic-app
```

## 3. Configure the app schema

```typescript title="index.ts"
import App, { type AppSchema } from '@latechforce/engine'

const schema: AppSchema = {
  name: 'My Fantastic App',
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
            return { message: 'Hello, world!' }
          }),
        },
      ],
    },
  ],
}

await new App().start(schema)
```

## 4. Run the app

```bash
$ bun start
```

## 5. Enjoy!

```bash
$ curl http://localhost:3000/api/automation/message
{"message":"Hello, world!"}
```

## License

Copyright (c) 2024-present Thomas JEANNEAU, La Tech Force (thomas.jeanneau@latechforce.com). This source code is licensed under a Fair Use License found in the [LICENSE](https://github.com/latechforce/engine/blob/main/LICENSE.md).
