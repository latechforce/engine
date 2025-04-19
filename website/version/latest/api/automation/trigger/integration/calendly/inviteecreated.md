# Invitee Created

A trigger that fires when an invitee is created in Calendly

## Required

### account

>account: `string`

### event

>event: const: `InviteeCreated`

### integration

>integration: const: `Calendly`

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
