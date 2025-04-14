# Read Record

## Description

Reads a record from the specified database table

## Properties

| Name    | Type                | Required | Description |
| ------- | ------------------- | -------- | ----------- |
| name    | string              | ✔       |             |
| id      | string              | ✔       |             |
| table   | string              | ✔       |             |
| service | const: `Database`   | ✔       |             |
| action  | const: `ReadRecord` | ✔       |             |

## Example

```json
{
  "service": "Database",
  "action": "ReadRecord",
  "table": "users",
  "id": "user_123"
}
```
