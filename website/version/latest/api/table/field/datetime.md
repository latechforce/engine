# DateTime

## Description

Represents a date and time field in forms and tables

## Properties

| Name        | Type              | Required | Description |
| ----------- | ----------------- | -------- | ----------- |
| name        | string            | ✔       |             |
| required    | boolean           |          |             |
| onMigration | Object            |          |             |
| type        | const: `DateTime` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "DateTime",
  "name": "appointmentTime",
  "required": true
}
```
