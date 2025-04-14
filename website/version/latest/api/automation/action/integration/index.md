# Integration

Union type of all possible integration actions that can be performed in automations

## Any Of

1. [PappersIntegrationActionAutomation](/api/automation/action/integration/pappers)
2. [QontoIntegrationActionAutomation](/api/automation/action/integration/qonto)
3. [NotionIntegrationActionAutomation](/api/automation/action/integration/notion)
4. [GoogleIntegrationActionAutomation](/api/automation/action/integration/google)
5. [GoCardlessIntegrationActionAutomation](/api/automation/action/integration/gocardless)

## Examples

Example 1:

```json
{
  "service": "Integration",
  "action": "GetCompany",
  "companyId": "123"
}
```
