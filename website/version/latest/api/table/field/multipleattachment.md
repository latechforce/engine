# Multiple attachment

Represents a field that can store multiple file attachments

## Properties

| Property    | Type    | Required | Const                  | Description |
| ----------- | ------- | -------- | ---------------------- | ----------- |
| name        | string  | Yes      |                        |             |
| required    | boolean | No       |                        |             |
| onMigration | object  | No       |                        |             |
| type        | string  | Yes      | `"MultipleAttachment"` |             |

## Examples

Example 1:

```json
{
  "type": "MultipleAttachment",
  "name": "documents",
  "required": true
}
```
