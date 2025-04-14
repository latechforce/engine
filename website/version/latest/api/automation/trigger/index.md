# Trigger

Union type of all possible triggers that can start automations

## Any Of

1. [ServiceTriggerAutomation](/api/automation/trigger/service)
2. [IntegrationTriggerAutomation](/api/automation/trigger/integration)

## Examples

Example 1:

```json
{
  "service": "Http",
  "trigger": "ApiCalled",
  "path": "/run-automation"
}
```
