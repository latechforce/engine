# Monitor

Configuration for monitoring services, supporting both Sentry and Console monitoring

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
## Any of

- [Sentry](/api/service/monitor/sentry)

- [Console](/api/service/monitor/console)

