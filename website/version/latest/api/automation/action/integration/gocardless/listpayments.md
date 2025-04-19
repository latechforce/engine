# List Payments

Lists payments using GoCardless integration with optional filters

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with GoCardless integration with ListPayments action",
  "automations": [
    {
      "name": "listPayments",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "list-payments",
        "output": {
          "payments": {
            "json": "{{listPayments.payments}}"
          },
          "meta": {
            "json": "{{listPayments.meta}}"
          }
        }
      },
      "actions": [
        {
          "name": "listPayments",
          "integration": "GoCardless",
          "action": "ListPayments",
          "account": "gocardless",
          "params": {
            "limit": 10,
            "status": "pending_submission"
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

>action: const: `ListPayments`

### integration

>integration: const: `GoCardless`

### name

>name: `string`

### params

>params: Object

