# Create Payment

## Description

Creates a new payment in GoCardless with the specified details

## Properties

| Name        | Type                   | Required | Description |
| ----------- | ---------------------- | -------- | ----------- |
| name        | string                 | ✔       |             |
| account     | string                 | ✔       |             |
| payment     | Object                 | ✔       |             |
| integration | const: `GoCardless`    | ✔       |             |
| action      | const: `CreatePayment` | ✔       |             |

## Property Details

### payment

| Property          | Type    | Required | Description |
| ----------------- | ------- | -------- | ----------- |
| amount            | number  | ✔       |             |
| currency          | string  | ✔       |             |
| charge_date       | string  |          |             |
| reference         | string  |          |             |
| description       | string  |          |             |
| metadata          | Object  |          |             |
| retry_if_possible | boolean |          |             |
| mandate           | string  | ✔       |             |

## Example

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
