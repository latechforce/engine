# Invitee Created

A trigger that fires when an invitee is created in Calendly

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a calendly invitee created trigger",
  "automations": [
    {
      "name": "CalendlyInviteeCreated",
      "trigger": {
        "integration": "Calendly",
        "event": "InviteeCreated",
        "account": "calendly"
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
>integration: const: `Calendly`

### Event

The event type for this trigger
>event: const: `InviteeCreated`

### Account

The account identifier for this trigger
>account: `string`

