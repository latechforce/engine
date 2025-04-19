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
        "user": {
          "username": "youcanbookme_user_username",
          "password": "youcanbookme_user_password"
        }
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

### User

The user credentials for YouCanBookMe
>user: Object

## Optional

### Base URL

The base URL for YouCanBookMe API
>baseUrl?: `string`

