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

### event

>event: const: `ApiCalled`

### path

>path: `string`

### service

>service: const: `Http`

## Optional

### input

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
### output

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
### auth

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
