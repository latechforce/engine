# Service

Union type of all possible service actions that can be performed in automations

## Any Of

1. [CodeServiceActionAutomation](/api/automation/action/service/code)
2. [DatabaseServiceActionAutomation](/api/automation/action/service/database)

## Examples

Example 1:

```json
{
  "service": "Service",
  "action": "RunJavascript",
  "code": "console.log(\"Hello, world!\");"
}
```
