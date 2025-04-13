# DateTime

Represents a date and time field in forms and tables

## Properties

| Property    | Type    | Required | Const        | Description |
| ----------- | ------- | -------- | ------------ | ----------- |
| name        | string  | Yes      |              |             |
| required    | boolean | No       |              |             |
| onMigration | object  | No       |              |             |
| type        | string  | Yes      | `"DateTime"` |             |

## Examples

Example 1:

```json
{
  "type": "DateTime",
  "name": "appointmentTime",
  "required": true
}
```
