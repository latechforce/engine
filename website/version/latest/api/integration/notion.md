# Notion

A configuration schema for Notion integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Notion integration",
  "integrations": {
    "notion": [
      {
        "account": "notion_account",
        "token": "notion_token"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for the Notion integration
>account: `string`

### Token

The authentication token for the Notion API
>token: `string`

## Optional

### Base URL

The base URL for the Notion API
>baseUrl?: `string`

### Polling Interval

The interval in milliseconds for polling Notion API
>pollingInterval?: `number`

