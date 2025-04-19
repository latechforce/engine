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

### accessToken

>accessToken: `string`

### account

>account: `string`

## Optional

### baseUrl

>baseUrl?: `string`

