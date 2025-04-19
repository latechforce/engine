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

### Account

The account identifier for the Airtable integration
>account: `string`

### API Key

The API key for Airtable
>apiKey: `string`

### Database ID

The database ID for Airtable
>databaseId: `string`

## Optional

### Base URL

The base URL for Airtable API
>baseUrl?: `string`

