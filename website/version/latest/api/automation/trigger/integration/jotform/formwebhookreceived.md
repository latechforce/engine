# Form Webhook Received

A trigger that fires when form webhook is received in Jotform

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a jotform form webhook received trigger",
  "automations": [
    {
      "name": "FormWebhookReceived",
      "trigger": {
        "integration": "Jotform",
        "event": "FormWebhookReceived",
        "account": "jotform",
        "formId": "{{ env.JOTFORM_FORM_ID }}"
      },
      "actions": []
    }
  ]
}

await new App().start(config)
```
## Required

### account

>account: `string`

### event

>event: const: `FormWebhookReceived`

### formId

>formId: `string`

### integration

>integration: const: `Jotform`

