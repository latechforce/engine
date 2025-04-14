# GoCardless

## Description

A configuration schema for GoCardless payment integration

## Properties

| Name        | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| name        | string | ✔       |             |
| baseUrl     | string |          |             |
| accessToken | string | ✔       |             |

## Example

```json
{
  "name": "payment-processing",
  "accessToken": "live_1234567890ABCD"
}
```
