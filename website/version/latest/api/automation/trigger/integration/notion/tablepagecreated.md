# Table Page Created

A trigger that fires when a table page is created in Notion

## Required

### account

>account: `string`

### event

>event: const: `TablePageCreated`

### integration

>integration: const: `Notion`

### table

>table: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a notion table page created trigger",
  "automations": [
    {
      "name": "NotionTablePageCreated",
      "trigger": {
        "integration": "Notion",
        "event": "TablePageCreated",
        "table": "{{ env.NOTION_TABLE_ID }}",
        "account": "notion"
      },
      "actions": []
    }
  ]
}

await new App().start(config)
```
