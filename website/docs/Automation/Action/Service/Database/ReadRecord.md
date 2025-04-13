# Read Record

Reads a record from the specified database table

## Properties

| Property | Type   | Required | Const          | Description |
| -------- | ------ | -------- | -------------- | ----------- |
| name     | string | Yes      |                |             |
| id       | string | Yes      |                |             |
| table    | string | Yes      |                |             |
| service  | string | Yes      | `"Database"`   |             |
| action   | string | Yes      | `"ReadRecord"` |             |

## Examples

Example 1:

```json
{
  "service": "Database",
  "action": "ReadRecord",
  "table": "users",
  "id": "user_123"
}
```
