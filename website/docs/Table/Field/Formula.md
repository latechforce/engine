# Formula

Represents a calculated field in forms and tables

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |
| type | string | Yes | `"Formula"` |  |
| formula | string | Yes |  |  |
| output | object | Yes |  |  |

## Examples

Example 1:

```json
{
  "type": "Formula",
  "name": "totalPrice",
  "formula": "price * quantity"
}
```

