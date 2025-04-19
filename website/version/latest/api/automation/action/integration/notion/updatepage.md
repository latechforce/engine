# Update Page

Updates a page in Notion with the specified properties

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Notion integration with UpdatePage action",
  "automations": [
    {
      "name": "updatePage",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "update-page",
        "input": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          }
        }
      },
      "actions": [
        {
          "name": "updatePage",
          "integration": "Notion",
          "action": "UpdatePage",
          "account": "notion",
          "table": "table_1",
          "id": "{{trigger.body.id}}",
          "page": {
            "name": "John Doe"
          }
        }
      ]
    }
  ]
}

await new App().start(config)
```
## Required

### account

>account: `string`

### action

>action: const: `UpdatePage`

### id

>id: `string`

### integration

>integration: const: `Notion`

### name

>name: `string`

### page

>page: Object

### table

>table: `string`

