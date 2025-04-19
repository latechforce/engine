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

### account

>account: `string`

### token

>token: `string`

## Optional

### baseUrl

>baseUrl?: `string`

### pollingInterval

>pollingInterval?: `number`

