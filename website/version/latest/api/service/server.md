# Server

The server config for the engine

## Optional

### apiKeys

Array of `string`

### port

`string` or `number`

```json
{
  "name": "App with port",
  "services": {
    "server": {
      "port": "6543"
    }
  }
}
```

### idleTimeout

`string` or `number`

### baseUrl

`string`

```json
{
  "name": "App with base url",
  "services": {
    "server": {
      "baseUrl": "http://custom-url.com"
    }
  }
}
```

### sslCert

`string`

### sslKey

`string`

### monitors

Array of enum: `Sentry`, `Console`
