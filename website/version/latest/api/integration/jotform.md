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

### account

>account: `string`

### apiKey

>apiKey: `string`

## Optional

### baseUrl

>baseUrl?: `string`

