# Create Record

Creates a new record in the specified database table with the given fields

## Properties

| Property | Type   | Required | Const            | Description |
| -------- | ------ | -------- | ---------------- | ----------- |
| name     | string | Yes      |                  |             |
| fields   | object | Yes      |                  |             |
| table    | string | Yes      |                  |             |
| service  | string | Yes      | `"Database"`     |             |
| action   | string | Yes      | `"CreateRecord"` |             |

## Examples

Example 1:

```json
{
  "service": "Database",
  "action": "CreateRecord",
  "table": "users",
  "fields": {
    "name": "{{trigger.payload.name}}",
    "email": "{{trigger.payload.email}}",
    "role": "customer",
    "createdAt": "{{now}}"
  }
}
```
