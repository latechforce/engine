# Run TypeScript

## Description

Executes TypeScript code with the specified input

## Properties

| Name    | Type                   | Required | Description |
| ------- | ---------------------- | -------- | ----------- |
| name    | string                 | ✔       |             |
| code    | string                 | ✔       |             |
| input   | unknown                |          |             |
| env     | Object                 |          |             |
| service | const: `Code`          | ✔       |             |
| action  | const: `RunTypescript` | ✔       |             |

## Example

```json
{
  "service": "Code",
  "action": "RunTypescript",
  "code": "return { result: input.value * 2 }",
  "input": {
    "value": 5
  }
}
```
