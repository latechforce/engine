# Phantombuster

A configuration schema for Phantombuster automation integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Phantombuster integration",
  "integrations": {
    "phantombuster": [
      {
        "account": "phantombuster_account",
        "apiKey": "phantombuster_api_key"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The Phantombuster account identifier
>account: `string`

### API Key

The Phantombuster API key for authentication
>apiKey: `string`

## Optional

### Base URL

The base URL for Phantombuster API
>baseUrl?: `string`

