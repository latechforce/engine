---
sidebar_position: 3
---

# Automation

Defines an automation workflow with triggers and actions

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
## Required

### Actions

The actions that are executed when the trigger is activated.
>actions: [Action](/api/automation/action)[]

### Name

The name of the automation.
>name: `string`

### Trigger

The trigger that starts the automation.
>trigger: [Trigger](/api/automation/trigger)

## Optional

### Description

The description of the automation.
>description?: `string`

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
