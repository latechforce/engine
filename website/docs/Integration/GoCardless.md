# GoCardless

A configuration schema for GoCardless payment integration

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| baseUrl | string | No |  |  |
| accessToken | string | Yes |  |  |

## Examples

Example 1:

```json
{
  "name": "payment-processing",
  "accessToken": "live_1234567890ABCD"
}
```

