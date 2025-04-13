# Get Company

Retrieves company information using Pappers integration

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| account | string | Yes |  |  |
| siret | string | Yes |  |  |
| integration | string | Yes | `"Pappers"` |  |
| action | string | Yes | `"GetCompany"` |  |

## Examples

Example 1:

```json
{
  "integration": "Pappers",
  "action": "GetCompany",
  "siren": "123456789"
}
```

