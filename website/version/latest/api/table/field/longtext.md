# Long text

## Description

Represents a field that stores multiple lines of text

## Properties

| Name        | Type              | Required | Description |
| ----------- | ----------------- | -------- | ----------- |
| name        | string            | ✔       |             |
| required    | boolean           |          |             |
| onMigration | Object            |          |             |
| type        | const: `LongText` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "LongText",
  "name": "description",
  "required": true
}
```
