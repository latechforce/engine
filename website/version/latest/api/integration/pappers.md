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

### account

>account: `string`

### apiKey

>apiKey: `string`

## Optional

### baseUrl

>baseUrl?: `string`

