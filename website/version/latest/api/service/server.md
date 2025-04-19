# Server

Configuration for the server service, excluding app metadata

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a server",
  "services": {
    "server": {
      "port": 3000,
      "baseUrl": "https://app.example.com"
    }
  }
}

await new App().start(config)
```
## Optional

### API Keys

List of API keys for authentication
>apiKeys?: `string`[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an api key",
  "services": {
    "server": {
      "apiKeys": [
        "api-key"
      ]
    }
  }
}

await new App().start(config)
```
### Port

The port number the server listens on
>port?: `string` or `number`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with port",
  "services": {
    "server": {
      "port": "6543"
    }
  }
}

await new App().start(config)
```
### Idle Timeout

The time in milliseconds before an idle connection is closed
>idleTimeout?: `string` or `number`

### Base URL

The base URL of the server
>baseUrl?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with base url",
  "services": {
    "server": {
      "baseUrl": "http://custom-url.com"
    }
  }
}

await new App().start(config)
```
### SSL Certificate

The SSL certificate file path
>sslCert?: `string`

### SSL Key

The SSL key file path
>sslKey?: `string`

### Monitor Drivers

The monitor drivers to use
>monitors?: enum: `Sentry`, `Console`[]

