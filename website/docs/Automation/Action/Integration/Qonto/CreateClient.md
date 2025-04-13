# Create Client

Creates a new client in Qonto with the specified details

## Properties

| Property    | Type   | Required | Const            | Description |
| ----------- | ------ | -------- | ---------------- | ----------- |
| name        | string | Yes      |                  |             |
| account     | string | Yes      |                  |             |
| client      | object | Yes      |                  |             |
| integration | string | Yes      | `"Qonto"`        |             |
| action      | string | Yes      | `"CreateClient"` |             |

## Examples

Example 1:

```json
{
  "integration": "Qonto",
  "action": "CreateClient",
  "client": {
    "name": "{{trigger.payload.companyName}}",
    "email": "{{trigger.payload.email}}",
    "phone": "{{trigger.payload.phone}}",
    "address": {
      "street": "{{trigger.payload.street}}",
      "city": "{{trigger.payload.city}}",
      "postalCode": "{{trigger.payload.postalCode}}",
      "country": "{{trigger.payload.country}}"
    }
  }
}
```
