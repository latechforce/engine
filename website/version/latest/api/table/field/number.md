# Number

Represents a field that stores numeric values

## Properties

| Property    | Type    | Required | Const      | Description |
| ----------- | ------- | -------- | ---------- | ----------- |
| name        | string  | Yes      |            |             |
| required    | boolean | No       |            |             |
| onMigration | object  | No       |            |             |
| type        | string  | Yes      | `"Number"` |             |

## Examples

Example 1:

```json
{
  "type": "Number",
  "name": "age",
  "required": true
}
```
