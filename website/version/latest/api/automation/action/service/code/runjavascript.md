# Run JavaScript

Executes JavaScript code with the specified input

## Required

### action

>action: const: `RunJavascript`

### code

>code: `string`

### name

>name: `string`

### service

>service: const: `Code`

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
## Optional

### input

>input?: `unknown`

### env

>env?: Object

