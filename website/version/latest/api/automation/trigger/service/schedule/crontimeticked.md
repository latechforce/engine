# Cron Time Ticked

A trigger that fires when a cron time is ticked

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a cron time ticked trigger",
  "automations": [
    {
      "name": "CronTimeTicked",
      "trigger": {
        "service": "Schedule",
        "event": "CronTimeTicked",
        "cronTime": "*/2 * * * * *"
      },
      "actions": []
    }
  ]
}

await new App().start(config)
```
## Required

### cronTime

>cronTime: `string`

### event

>event: const: `CronTimeTicked`

### service

>service: const: `Schedule`

