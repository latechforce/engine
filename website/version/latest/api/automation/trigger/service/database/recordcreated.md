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

### event

>event: const: `RecordCreated`

### service

>service: const: `Database`

### table

>table: `string`

