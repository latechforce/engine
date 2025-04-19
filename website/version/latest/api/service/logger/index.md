# Logger

Configuration for logging services

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
The default configuration is:

```json
{
  "type": "Console",
  "level": "info"
}
```

## Any of

- [Console](/api/service/logger/console)

- [File](/api/service/logger/file)

