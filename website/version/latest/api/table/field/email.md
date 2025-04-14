# Email

## Description

Represents a field that stores an email address

## Properties

| Name        | Type           | Required | Description |
| ----------- | -------------- | -------- | ----------- |
| name        | string         | ✔       |             |
| required    | boolean        |          |             |
| onMigration | Object         |          |             |
| type        | const: `Email` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "Email",
  "name": "email",
  "required": true
}
```
