# Action

Union type of all possible actions that can be performed in automations

## Any Of

1. [IntegrationActionAutomation](/api/automation/action/integration)
2. [ServiceActionAutomation](/api/automation/action/service)

## Examples

Example 1:

```json
{
  "service": "Database",
  "action": "ReadRecord",
  "table": "users",
  "id": "user_123"
}
```
