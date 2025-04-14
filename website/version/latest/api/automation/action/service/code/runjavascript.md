# Run JavaScript

## Description

Executes JavaScript code with the specified input

## Properties

| Name    | Type                   | Required | Description |
| ------- | ---------------------- | -------- | ----------- |
| name    | string                 | ✔       |             |
| code    | string                 | ✔       |             |
| input   | unknown                |          |             |
| env     | Object                 |          |             |
| service | const: `Code`          | ✔       |             |
| action  | const: `RunJavascript` | ✔       |             |

## Example

```json
{
  "service": "Code",
  "action": "RunJavascript",
  "code": "return { result: input.value * 2 }",
  "input": {
    "value": 5
  }
}
```
