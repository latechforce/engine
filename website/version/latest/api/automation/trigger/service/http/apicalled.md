# Api Called

A trigger that fires when an API is called

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a http api called trigger",
  "automations": [
    {
      "name": "ApiCalled",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
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
>event: const: `ApiCalled`

### Path

The API endpoint path where the trigger will be activated
>path: `string`

## Optional

### Input

The JSON schema for validating the input data
>input?: Object

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a http api called trigger with input",
  "automations": [
    {
      "name": "ApiCalledWithTextInput",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "run",
        "input": {
          "type": "object",
          "properties": {
            "text": {
              "type": "string"
            }
          },
          "required": [
            "text"
          ]
        }
      },
      "actions": []
    }
  ]
}

await new App().start(config)
```
### Output

The template for formatting the output response
>output?: Object

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a http api called trigger with output",
  "automations": [
    {
      "name": "ApiCalled",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "/run",
        "output": {
          "value": "hello"
        }
      },
      "actions": []
    }
  ]
}

await new App().start(config)
```
### Auth

The authentication settings for the API endpoint
>auth?: const: `ApiKey`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a http api called trigger with auth",
  "automations": [
    {
      "name": "ApiCalled",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "/run",
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
