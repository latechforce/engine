# Email

Represents a field that stores an email address

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |
| type | string | Yes | `"Email"` |  |

## Examples

Example 1:

```json
{
  "type": "Email",
  "name": "email",
  "required": true
}
```

