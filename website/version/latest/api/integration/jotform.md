# Jotform

A configuration schema for Jotform integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Jotform integration",
  "integrations": {
    "jotform": [
      {
        "account": "jotform_account",
        "apiKey": "jotform_api_key"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account name for the Jotform integration
>account: `string`

### API Key

The API key for authenticating with Jotform
>apiKey: `string`

## Optional

### Base URL

The base URL for the Jotform API
>baseUrl?: `string`

