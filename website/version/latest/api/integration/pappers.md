# Pappers

A configuration schema for Pappers integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Pappers integration",
  "integrations": {
    "pappers": [
      {
        "account": "pappers_account",
        "apiKey": "pappers_api_key"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for the Pappers integration
>account: `string`

### API Key

The API key for authenticating with Pappers
>apiKey: `string`

## Optional

### Base URL

The base URL for the Pappers API
>baseUrl?: `string`

