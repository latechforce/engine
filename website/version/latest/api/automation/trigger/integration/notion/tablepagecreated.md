# Table Page Created

A trigger that fires when a table page is created in Notion

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
## Required

### Integration

The integration type for this trigger
>integration: const: `Notion`

### Event

The event type for this trigger
>event: const: `TablePageCreated`

### Database

The database identifier for this trigger
>table: `string`

### Account

The account identifier for this trigger
>account: `string`

