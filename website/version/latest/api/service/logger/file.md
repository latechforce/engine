# File

Configuration for file-based logging services

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
>type: const: `File`

### Filename

The path to the log file
>filename: `string`

## Optional

### Level

The minimum log level to output messages
>level?: `string`

### Silent

Whether to suppress all log output
>silent?: `boolean`

