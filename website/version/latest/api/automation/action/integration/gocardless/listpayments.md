# List Payments

## Description

Lists payments using GoCardless integration with optional filters

## Properties

| Name        | Type                  | Required | Description |
| ----------- | --------------------- | -------- | ----------- |
| name        | string                | ✔       |             |
| account     | string                | ✔       |             |
| params      | Object                | ✔       |             |
| integration | const: `GoCardless`   | ✔       |             |
| action      | const: `ListPayments` | ✔       |             |

## Property Details

### params

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| limit    | number |          |             |
| after    | string |          |             |
| before   | string |          |             |
| status   | string |          |             |
| mandate  | string |          |             |

## Example

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
