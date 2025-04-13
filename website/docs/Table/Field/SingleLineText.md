# Single line text

Represents a field that stores a single line of text

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |
| type | string | Yes | `"SingleLineText"` |  |

## Examples

Example 1:

```json
{
  "type": "SingleLineText",
  "name": "title",
  "required": true
}
```

