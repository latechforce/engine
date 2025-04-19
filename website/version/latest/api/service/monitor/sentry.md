# Sentry

Configuration for Sentry monitoring services

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
>type: const: `Sentry`

### DSN

The Data Source Name (DSN) for Sentry
>dsn: `string`

### Environment

The environment name for Sentry
>environment: `string`

