# Multiple linked record

## Description

Represents a field that can link to multiple records from another table

## Properties

| Name        | Type                          | Required | Description |
| ----------- | ----------------------------- | -------- | ----------- |
| name        | string                        | ✔       |             |
| required    | boolean                       |          |             |
| onMigration | Object                        |          |             |
| type        | const: `MultipleLinkedRecord` | ✔       |             |
| table       | string                        | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "MultipleLinkedRecord",
  "name": "projects",
  "required": true,
  "table": "projects"
}
```
