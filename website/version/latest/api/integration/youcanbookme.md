# YouCanBookMe

A configuration schema for YouCanBookMe scheduling integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Youcanbookme integration",
  "integrations": {
    "youcanbookme": [
      {
        "account": "youcanbookme_account",
        "username": "youcanbookme_user_username",
        "password": "youcanbookme_user_password"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for YouCanBookMe
>account: `string`

### Username

The username for YouCanBookMe
>username: `string`

### Password

The password for YouCanBookMe
>password: `string`

## Optional

### Base URL

The base URL for YouCanBookMe API
>baseUrl?: `string`

