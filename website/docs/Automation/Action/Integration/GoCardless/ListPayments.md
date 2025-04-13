# List Payments

Lists payments using GoCardless integration with optional filters

## Properties

| Property    | Type   | Required | Const            | Description |
| ----------- | ------ | -------- | ---------------- | ----------- |
| name        | string | Yes      |                  |             |
| account     | string | Yes      |                  |             |
| params      | object | Yes      |                  |             |
| integration | string | Yes      | `"GoCardless"`   |             |
| action      | string | Yes      | `"ListPayments"` |             |

## Examples

Example 1:

```json
{
  "integration": "GoCardless",
  "action": "ListPayments",
  "filters": {
    "status": "paid",
    "limit": 10
  }
}
```
