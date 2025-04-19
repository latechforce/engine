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

### account

>account: `string`

### user

>user: Object

## Optional

### baseUrl

>baseUrl?: `string`

