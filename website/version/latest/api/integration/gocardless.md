# GoCardless

A configuration schema for GoCardless payment integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Gocardless integration",
  "integrations": {
    "gocardless": [
      {
        "account": "gocardless_account",
        "accessToken": "gocardless_access_token"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for the GoCardless integration
>account: `string`

### Access Token

The access token for authenticating with GoCardless
>accessToken: `string`

## Optional

### Base URL

The base URL for the GoCardless API
>baseUrl?: `string`

