# Multiple attachment

## Description

Represents a field that can store multiple file attachments

## Properties

| Name        | Type                        | Required | Description |
| ----------- | --------------------------- | -------- | ----------- |
| name        | string                      | ✔       |             |
| required    | boolean                     |          |             |
| onMigration | Object                      |          |             |
| type        | const: `MultipleAttachment` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "MultipleAttachment",
  "name": "documents",
  "required": true
}
```
