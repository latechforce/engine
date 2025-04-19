---
sidebar_position: 6
---

# Integrations

Defines configurations for various third-party service integrations

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with integrations",
  "integrations": {
    "notion": [
      {
        "account": "notion_account",
        "token": "notion_token"
      }
    ],
    "qonto": [
      {
        "account": "qonto_account",
        "organisationSlug": "qonto_organisation_slug",
        "secretKey": "qonto_secret_key"
      }
    ]
  }
}

await new App().start(config)
```
## Optional

### Airtable

Configuration for Airtable integrations.
>airtable?: [Airtable](/api/integration/airtable)[]

### Notion

Configuration for Notion integrations.
>notion?: [Notion](/api/integration/notion)[]

### Pappers

Configuration for Pappers integrations.
>pappers?: [Pappers](/api/integration/pappers)[]

### Qonto

Configuration for Qonto integrations.
>qonto?: [Qonto](/api/integration/qonto)[]

### Google

Configuration for Google integrations.
>google?: [Google](/api/integration/google)

### GoCardless

Configuration for GoCardless integrations.
>gocardless?: [GoCardless](/api/integration/gocardless)[]

### Phantombuster

Configuration for Phantombuster integrations.
>phantombuster?: [Phantombuster](/api/integration/phantombuster)[]

### Calendly

Configuration for Calendly integrations.
>calendly?: [Calendly](/api/integration/calendly)[]

### YouCanBookMe

Configuration for YouCanBookMe integrations.
>youcanbookme?: [YouCanBookMe](/api/integration/youcanbookme)[]

### Jotform

Configuration for Jotform integrations.
>jotform?: [Jotform](/api/integration/jotform)[]

