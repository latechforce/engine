# Single linked record

## Description

Represents a field that can link to a single record from another table

## Properties

| Name        | Type                        | Required | Description |
| ----------- | --------------------------- | -------- | ----------- |
| name        | string                      | ✔       |             |
| required    | boolean                     |          |             |
| onMigration | Object                      |          |             |
| type        | const: `SingleLinkedRecord` | ✔       |             |
| table       | string                      | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "SingleLinkedRecord",
  "name": "manager",
  "required": true,
  "table": "users"
}
```
