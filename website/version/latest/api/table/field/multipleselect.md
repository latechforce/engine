# Multiple select

## Description

Represents a field that allows selecting multiple options from a predefined list

## Properties

| Name        | Type                    | Required | Description |
| ----------- | ----------------------- | -------- | ----------- |
| name        | string                  | ✔       |             |
| required    | boolean                 |          |             |
| onMigration | Object                  |          |             |
| type        | const: `MultipleSelect` | ✔       |             |
| options     | Array&lt;string&gt;     | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "MultipleSelect",
  "name": "interests",
  "required": true,
  "options": ["Sports", "Music", "Travel"]
}
```
