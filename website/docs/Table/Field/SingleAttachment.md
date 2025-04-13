# Single attachment

Represents a field that can store a single file attachment

## Properties

| Property    | Type    | Required | Const                | Description |
| ----------- | ------- | -------- | -------------------- | ----------- |
| name        | string  | Yes      |                      |             |
| required    | boolean | No       |                      |             |
| onMigration | object  | No       |                      |             |
| type        | string  | Yes      | `"SingleAttachment"` |             |

## Examples

Example 1:

```json
{
  "type": "SingleAttachment",
  "name": "profilePicture",
  "required": true
}
```
