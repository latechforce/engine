# Retrieve Attachment

Retrieves an attachment using Qonto integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Qonto integration with RetrieveAttachment action",
  "automations": [
    {
      "name": "retrieveAttachment",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "retrieve-attachment",
        "output": {
          "attachment": {
            "json": "{{retrieveAttachment}}"
          }
        }
      },
      "actions": [
        {
          "name": "retrieveAttachment",
          "integration": "Qonto",
          "action": "RetrieveAttachment",
          "account": "qonto",
          "attachmentId": "{{trigger.body.attachmentId}}"
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

>action: const: `RetrieveAttachment`

### attachmentId

>attachmentId: `string`

### integration

>integration: const: `Qonto`

### name

>name: `string`

