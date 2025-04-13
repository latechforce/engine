# Single linked record

Represents a field that can link to a single record from another table

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |
| type | string | Yes | `"SingleLinkedRecord"` |  |
| table | string | Yes |  |  |

## Examples

Example 1:

```json
{
  "type": "SingleLinkedRecord",
  "name": "manager",
  "required": true,
  "table": "users"
}
```

