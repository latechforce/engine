# Booking Created

A trigger that fires when a booking is created in YouCanBookMe

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a youcanbookme booking created trigger",
  "automations": [
    {
      "name": "YouCanBookMeBookingCreated",
      "trigger": {
        "integration": "YouCanBookMe",
        "event": "BookingCreated",
        "account": "youcanbookme"
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
>integration: const: `YouCanBookMe`

### Event

The event type for this trigger
>event: const: `BookingCreated`

### Account

The account identifier for this trigger
>account: `string`

