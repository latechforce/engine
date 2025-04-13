# Long text

Represents a field that stores multiple lines of text

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |
| type | string | Yes | `"LongText"` |  |

## Examples

Example 1:

```json
{
  "type": "LongText",
  "name": "description",
  "required": true
}
```

