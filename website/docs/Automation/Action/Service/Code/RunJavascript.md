# Run JavaScript

Executes JavaScript code with the specified input

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| code | string | Yes |  |  |
| input | any | No |  |  |
| env | object | No |  |  |
| service | string | Yes | `"Code"` |  |
| action | string | Yes | `"RunJavascript"` |  |

## Examples

Example 1:

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

