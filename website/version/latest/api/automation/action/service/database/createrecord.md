# Create Record

## Description

Creates a new record in the specified database table with the given fields

## Properties

| Name    | Type                  | Required | Description |
| ------- | --------------------- | -------- | ----------- |
| name    | string                | ✔       |             |
| fields  | Object                | ✔       |             |
| table   | string                | ✔       |             |
| service | const: `Database`     | ✔       |             |
| action  | const: `CreateRecord` | ✔       |             |

## Example

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
