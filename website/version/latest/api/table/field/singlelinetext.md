# Single line text

## Description

Represents a field that stores a single line of text

## Properties

| Name        | Type                    | Required | Description |
| ----------- | ----------------------- | -------- | ----------- |
| name        | string                  | ✔       |             |
| required    | boolean                 |          |             |
| onMigration | Object                  |          |             |
| type        | const: `SingleLineText` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "SingleLineText",
  "name": "title",
  "required": true
}
```
