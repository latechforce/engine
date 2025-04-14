# Single attachment

## Description

Represents a field that can store a single file attachment

## Properties

| Name        | Type                      | Required | Description |
| ----------- | ------------------------- | -------- | ----------- |
| name        | string                    | ✔       |             |
| required    | boolean                   |          |             |
| onMigration | Object                    |          |             |
| type        | const: `SingleAttachment` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "SingleAttachment",
  "name": "profilePicture",
  "required": true
}
```
