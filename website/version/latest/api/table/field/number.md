# Number

## Description

Represents a field that stores numeric values

## Properties

| Name        | Type            | Required | Description |
| ----------- | --------------- | -------- | ----------- |
| name        | string          | ✔       |             |
| required    | boolean         |          |             |
| onMigration | Object          |          |             |
| type        | const: `Number` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "Number",
  "name": "age",
  "required": true
}
```
