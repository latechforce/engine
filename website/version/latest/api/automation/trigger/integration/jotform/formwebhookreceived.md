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

### Integration

The integration type for this trigger
>integration: const: `Jotform`

### Event

The event type for this trigger
>event: const: `FormWebhookReceived`

### Form

The form identifier for this trigger
>formId: `string`

### Account

The account identifier for this trigger
>account: `string`

