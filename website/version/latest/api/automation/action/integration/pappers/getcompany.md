# Get Company

## Description

Retrieves company information using Pappers integration

## Properties

| Name        | Type                | Required | Description |
| ----------- | ------------------- | -------- | ----------- |
| name        | string              | ✔       |             |
| account     | string              | ✔       |             |
| siret       | string              | ✔       |             |
| integration | const: `Pappers`    | ✔       |             |
| action      | const: `GetCompany` | ✔       |             |

## Example

```json
{
  "integration": "Pappers",
  "action": "GetCompany",
  "siren": "123456789"
}
```
