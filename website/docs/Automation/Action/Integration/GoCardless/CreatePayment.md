# Create Payment

Creates a new payment in GoCardless with the specified details

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| account | string | Yes |  |  |
| payment | object | Yes |  |  |
| integration | string | Yes | `"GoCardless"` |  |
| action | string | Yes | `"CreatePayment"` |  |

## Examples

Example 1:

```json
{
  "integration": "GoCardless",
  "action": "CreatePayment",
  "payment": {
    "amount": 1000,
    "currency": "EUR",
    "description": "Monthly subscription",
    "mandate": "{{trigger.payload.mandateId}}",
    "metadata": {
      "orderId": "{{trigger.payload.orderId}}",
      "customerId": "{{trigger.payload.customerId}}"
    }
  }
}
```

