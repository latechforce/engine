# Run JavaScript

Executes JavaScript code with the specified input

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App",
  "automations": [
    {
      "name": "runJavascript",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "run-javascript",
        "output": {
          "message": "{{runJavascriptCode.message}}"
        }
      },
      "actions": [
        {
          "service": "Code",
          "action": "RunJavascript",
          "name": "runJavascriptCode",
          "code": "async function() {\n            return { message: \"Hello, world!\" };\n          }"
        }
      ]
    }
  ]
}

await new App().start(config)
```
## Required

### Name

The name for this action
>name: `string`

### Service

The service type for this action
>service: const: `Code`

### Action

The action type for this action
>action: const: `RunJavascript`

### Code

The code for this action
>code: `string`

## Optional

### Input

The input for this action
>input?: `unknown`

### Environment Variables

The environment variables for this action
>env?: Object

