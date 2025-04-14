# Multiple select

Represents a field that allows selecting multiple options from a predefined list

## Properties

| Property    | Type    | Required | Const              | Description |
| ----------- | ------- | -------- | ------------------ | ----------- |
| name        | string  | Yes      |                    |             |
| required    | boolean | No       |                    |             |
| onMigration | object  | No       |                    |             |
| type        | string  | Yes      | `"MultipleSelect"` |             |
| options     | array   | Yes      |                    |             |

## Examples

Example 1:

```json
{
  "type": "MultipleSelect",
  "name": "interests",
  "required": true,
  "options": ["Sports", "Music", "Travel"]
}
```
