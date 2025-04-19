# Console

Configuration for console logging services

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a logger",
  "services": {
    "loggers": [
      {
        "type": "Console",
        "level": "info"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Type

The type of logger configuration
>type: const: `Console`

## Optional

### Level

The minimum log level to output messages
>level?: `string`

### Silent

Whether to suppress all log output
>silent?: `boolean`

