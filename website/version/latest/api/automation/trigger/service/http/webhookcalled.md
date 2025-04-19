# Webhook Called

A trigger that fires when a webhook is called

## Required

### event

>event: const: `WebhookCalled`

### path

>path: `string`

### service

>service: const: `Http`

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
## Optional

### auth

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
