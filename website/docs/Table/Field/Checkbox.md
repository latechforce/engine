# Checkbox

Represents a boolean checkbox field in forms and tables

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |
| type | string | Yes | `"Checkbox"` |  |

## Examples

Example 1:

```json
{
  "type": "Checkbox",
  "name": "termsAccepted",
  "required": true
}
```

