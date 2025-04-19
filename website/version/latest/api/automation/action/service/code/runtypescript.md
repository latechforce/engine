# Run TypeScript

Executes TypeScript code with the specified input

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a run typescript action",
  "automations": [
    {
      "name": "run-typescript",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "run-typescript",
        "output": {
          "message": "{{runTypescriptCode.message}}"
        }
      },
      "actions": [
        {
          "service": "Code",
          "action": "RunTypescript",
          "name": "runTypescriptCode",
          "code": "async function() {\n            return { message: \"Hello, world!\" };\n          }"
        }
      ]
    }
  ]
}

await new App().start(config)
```
## Required

### action

>action: const: `RunTypescript`

### code

>code: `string`

### name

>name: `string`

### service

>service: const: `Code`

## Optional

### input

>input?: `unknown`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a run typescript action with input",
  "automations": [
    {
      "name": "run-typescript",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "run-typescript-with-input",
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
        },
        "output": {
          "message": "{{runJavascriptCode.message}}"
        }
      },
      "actions": [
        {
          "service": "Code",
          "action": "RunTypescript",
          "name": "runJavascriptCode",
          "input": {
            "text": "{{trigger.body.text}}"
          },
          "code": "async function(context) {\n            const { text } = context.inputData;\n            return { message: text };\n          }"
        }
      ]
    }
  ]
}

await new App().start(config)
```
### env

>env?: Object

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a run typescript action with env",
  "automations": [
    {
      "name": "runTypescriptWithEnv",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "run-typescript-with-env",
        "output": {
          "nodeEnv": "{{runJavascriptCode.nodeEnv}}"
        }
      },
      "actions": [
        {
          "service": "Code",
          "action": "RunTypescript",
          "name": "runJavascriptCode",
          "env": {
            "NODE_ENV": "xxx"
          },
          "code": "async function(context) {\n            const { env } = context, { NODE_ENV } = env;\n            return { nodeEnv: NODE_ENV };\n          }"
        }
      ]
    }
  ]
}

await new App().start(config)
```
