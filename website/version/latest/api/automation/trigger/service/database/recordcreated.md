# Record Created

A trigger that fires when a record is created in a database

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a database record created trigger",
  "automations": [
    {
      "name": "RecordCreated",
      "trigger": {
        "service": "Database",
        "event": "RecordCreated",
        "table": "table_1"
      },
      "actions": []
    }
  ],
  "tables": [
    {
      "name": "table_1",
      "fields": []
    }
  ]
}

await new App().start(config)
```
## Required

### Service

The service type for this trigger
>service: const: `Database`

### Event

The event type for this trigger
>event: const: `RecordCreated`

### Table

The table name for this trigger
>table: `string`

