# Single select

## Description

Represents a field that allows selecting one option from a predefined list

## Properties

| Name        | Type                  | Required | Description |
| ----------- | --------------------- | -------- | ----------- |
| name        | string                | ✔       |             |
| required    | boolean               |          |             |
| onMigration | Object                |          |             |
| type        | const: `SingleSelect` | ✔       |             |
| options     | Array&lt;string&gt;   | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "SingleSelect",
  "name": "status",
  "required": true,
  "options": ["Active", "Inactive", "Pending"]
}
```
