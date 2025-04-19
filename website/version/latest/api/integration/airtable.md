# Airtable

A configuration schema for Airtable integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Airtable integration",
  "integrations": {
    "airtable": [
      {
        "account": "airtable_account",
        "apiKey": "airtable_api_key",
        "databaseId": "airtable_base_id"
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

### databaseId

>databaseId: `string`

## Optional

### baseUrl

>baseUrl?: `string`

