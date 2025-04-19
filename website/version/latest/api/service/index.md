# Services

Defines configurations for various services

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with services",
  "services": {
    "server": {
      "port": 3000
    },
    "database": {
      "type": "SQLite",
      "url": "./tmp/database.sqlite"
    }
  }
}

await new App().start(config)
```
## Optional

### Server

Configuration for the server service.
>server?: [Server](/api/service/server)

### Database

Configuration for the database service.
>database?: [Database](/api/service/database)

### Monitors

Configurations for monitoring services.
>monitors?: [Monitor](/api/service/monitor)[]

### Loggers

Configurations for logging services.
>loggers?: [Logger](/api/service/logger)[]

### Tunnel

Configuration for the tunnel service.
>tunnel?: [Tunnel](/api/service/tunnel)

### Theme

Configuration for the theme service.
>theme?: [Theme](/api/service/theme)

