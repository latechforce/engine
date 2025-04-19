# Webhook Called

A trigger that fires when a webhook is called

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a http webhook called trigger",
  "automations": [
    {
      "name": "WebhookCalled",
      "trigger": {
        "service": "Http",
        "event": "WebhookCalled",
        "path": "/run"
      },
      "actions": []
    }
  ]
}

await new App().start(config)
```
## Required

### Service

The service type for this trigger
>service: const: `Http`

### Event

The event type for this trigger
>event: const: `WebhookCalled`

### Path

The path for this trigger
>path: `string`

## Optional

### Authentication

The authentication configuration for this trigger
>auth?: `unknown`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a http webhook called trigger with auth",
  "automations": [
    {
      "name": "WebhookCalledWithApiKeyAuth",
      "trigger": {
        "service": "Http",
        "event": "WebhookCalled",
        "path": "run",
        "auth": "ApiKey"
      },
      "actions": []
    }
  ],
  "services": {
    "server": {
      "apiKeys": [
        "test-key"
      ]
    }
  }
}

await new App().start(config)
```
