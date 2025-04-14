# Create Client

## Description

Creates a new client in Qonto with the specified details

## Properties

| Name        | Type                  | Required | Description |
| ----------- | --------------------- | -------- | ----------- |
| name        | string                | ✔       |             |
| account     | string                | ✔       |             |
| client      | Object                | ✔       |             |
| integration | const: `Qonto`        | ✔       |             |
| action      | const: `CreateClient` | ✔       |             |

## Property Details

### client

| Property                  | Type   | Required | Description |
| ------------------------- | ------ | -------- | ----------- |
| currency                  | string | ✔       |             |
| email                     | string |          |             |
| vat_number                | string |          |             |
| name                      | string |          |             |
| first_name                | string |          |             |
| last_name                 | string |          |             |
| type                      | string | ✔       |             |
| tax_identification_number | string |          |             |
| address                   | string | ✔       |             |
| city                      | string | ✔       |             |
| zip_code                  | string | ✔       |             |
| country_code              | string | ✔       |             |
| billing_address           | Object |          |             |
| delivery_address          | Object |          |             |
| locale                    | string | ✔       |             |

## Example

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
