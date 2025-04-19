# Calendly

A configuration schema for Calendly scheduling integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Calendly integration",
  "integrations": {
    "calendly": [
      {
        "account": "calendly_account",
        "user": {
          "accessToken": "calendly_user_access_token"
        }
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for Calendly
>account: `string`

### User

The user configuration for Calendly
>user: Object

## Optional

### Base URL

The base URL for Calendly API
>baseUrl?: `string`

