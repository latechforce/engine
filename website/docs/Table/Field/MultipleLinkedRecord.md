# Multiple linked record

Represents a field that can link to multiple records from another table

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |
| type | string | Yes | `"MultipleLinkedRecord"` |  |
| table | string | Yes |  |  |

## Examples

Example 1:

```json
{
  "type": "MultipleLinkedRecord",
  "name": "projects",
  "required": true,
  "table": "projects"
}
```

