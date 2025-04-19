# Console

Configuration for console monitoring services

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a monitor",
  "services": {
    "monitors": [
      {
        "type": "Sentry",
        "dsn": "https://sentry.io/your-sentry-dsn",
        "environment": "production"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Type

The type of monitor configuration
>type: const: `Console`

