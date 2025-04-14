# Checkbox

## Description

Represents a boolean checkbox field in forms and tables

## Properties

| Name        | Type              | Required | Description |
| ----------- | ----------------- | -------- | ----------- |
| name        | string            | ✔       |             |
| required    | boolean           |          |             |
| onMigration | Object            |          |             |
| type        | const: `Checkbox` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "Checkbox",
  "name": "termsAccepted",
  "required": true
}
```
