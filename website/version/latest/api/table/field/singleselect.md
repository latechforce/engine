# Single select

Represents a field that allows selecting one option from a predefined list

## Properties

| Property    | Type    | Required | Const            | Description |
| ----------- | ------- | -------- | ---------------- | ----------- |
| name        | string  | Yes      |                  |             |
| required    | boolean | No       |                  |             |
| onMigration | object  | No       |                  |             |
| type        | string  | Yes      | `"SingleSelect"` |             |
| options     | array   | Yes      |                  |             |

## Examples

Example 1:

```json
{
  "type": "SingleSelect",
  "name": "status",
  "required": true,
  "options": ["Active", "Inactive", "Pending"]
}
```
