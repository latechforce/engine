# Read Record

Reads a record from the specified database table

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a database read record action",
  "automations": [
    {
      "name": "readRecord",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "read-record",
        "input": {
          "type": "object",
          "properties": {
            "recordId": {
              "type": "string"
            }
          }
        },
        "output": {
          "record": {
            "json": "{{readRecord.record}}"
          }
        }
      },
      "actions": [
        {
          "service": "Database",
          "action": "ReadRecord",
          "name": "readRecord",
          "table": "records",
          "id": "{{trigger.body.recordId}}"
        }
      ]
    }
  ],
  "tables": [
    {
      "name": "records",
      "fields": []
    }
  ]
}

await new App().start(config)
```
## Required

### Name

The name for this action
>name: `string`

### Service

The service type for this action
>service: const: `Database`

### Action

The action type for this action
>action: const: `ReadRecord`

### Table

The table name for this action
>table: `string`

### Record

The record identifier for this action
>id: `string`

