# Create Payment

Creates a new payment in GoCardless with the specified details

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with GoCardless integration with CreatePayment action",
  "automations": [
    {
      "name": "createPayment",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "create-payment",
        "output": {
          "id": "{{createPayment.id}}"
        }
      },
      "actions": [
        {
          "name": "createPayment",
          "integration": "GoCardless",
          "action": "CreatePayment",
          "account": "gocardless",
          "payment": {
            "amount": 1000,
            "currency": "EUR",
            "description": "Test payment",
            "mandate": "MD123",
            "charge_date": "2025-01-01",
            "retry_if_possible": true
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

>action: const: `CreatePayment`

### integration

>integration: const: `GoCardless`

### name

>name: `string`

### payment

>payment: Object

