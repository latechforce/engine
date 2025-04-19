# Booking Created

A trigger that fires when a booking is created in YouCanBookMe

## Required

### account

>account: `string`

### event

>event: const: `BookingCreated`

### integration

>integration: const: `YouCanBookMe`

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
