# Action

Union type of all possible actions that can be performed in automations

## Any Of

1. [IntegrationActionAutomation](/docs/automation/action/integration)
2. [ServiceActionAutomation](/docs/automation/action/service)

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

