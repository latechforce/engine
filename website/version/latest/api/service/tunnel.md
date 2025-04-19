# Tunnel

Configuration for tunnel service

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
## Required

### Type

The type of tunnel integration to use
>integration: const: `Ngrok`

### Authentication token

The authentication token for the tunnel service
>authToken: `string`

### Account name

The account name for the tunnel service
>account: `string`

