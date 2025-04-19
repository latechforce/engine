# Server

The server config for the engine

## Optional

### apiKeys

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
### port

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
### idleTimeout

>idleTimeout?: `string` or `number`

### baseUrl

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
### sslCert

>sslCert?: `string`

### sslKey

>sslKey?: `string`

### monitors

>monitors?: enum: `Sentry`, `Console`[]

