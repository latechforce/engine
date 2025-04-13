# Gmail

A configuration schema for Gmail integration

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| baseUrl | string | No |  |  |
| user | string | Yes |  |  |
| password | string | Yes |  |  |

## Examples

Example 1:

```json
{
  "name": "support-email",
  "user": "support@company.com",
  "password": "app-specific-password"
}
```

