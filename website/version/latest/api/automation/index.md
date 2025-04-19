---
sidebar_position: 3
---

# Automation

Defines an automation workflow with triggers and actions

## Required

### actions

>actions: [Action](/api/automation/action)[]

### name

>name: `string`

### trigger

>trigger: [Trigger](/api/automation/trigger)

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation",
  "automations": [
    {
      "name": "automation_1",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "/run"
      },
      "actions": [
        {
          "name": "action_1",
          "service": "Code",
          "action": "RunJavascript",
          "code": "function() {\n            console.log(\"Hello, world!\");\n          }"
        }
      ]
    }
  ]
}

await new App().start(config)
```
## Optional

### description

>description?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with an automation with a description",
  "automations": [
    {
      "name": "automation_1",
      "description": "This is a description",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "/run"
      },
      "actions": [
        {
          "name": "action_1",
          "service": "Code",
          "action": "RunJavascript",
          "code": "function() {\n            console.log(\"Hello, world!\");\n          }"
        }
      ]
    }
  ]
}

await new App().start(config)
```
