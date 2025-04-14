# Url

Represents a field that stores a URL

## Properties

| Property    | Type    | Required | Const   | Description |
| ----------- | ------- | -------- | ------- | ----------- |
| name        | string  | Yes      |         |             |
| required    | boolean | No       |         |             |
| onMigration | object  | No       |         |             |
| type        | string  | Yes      | `"Url"` |             |

## Examples

Example 1:

```json
{
  "type": "Url",
  "name": "website",
  "required": true
}
```
