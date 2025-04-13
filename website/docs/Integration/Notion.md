# Notion

A configuration schema for Notion integration

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| baseUrl | string | No |  |  |
| token | string | Yes |  |  |
| pollingInterval | number | No |  |  |

## Examples

Example 1:

```json
{
  "name": "project-management",
  "token": "secret_1234567890ABCD",
  "pollingInterval": 300000
}
```

