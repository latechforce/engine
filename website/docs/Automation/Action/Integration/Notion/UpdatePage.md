# Update Page

Updates a page in Notion with the specified properties

## Properties

| Property    | Type   | Required | Const          | Description |
| ----------- | ------ | -------- | -------------- | ----------- |
| name        | string | Yes      |                |             |
| account     | string | Yes      |                |             |
| table       | string | Yes      |                |             |
| id          | string | Yes      |                |             |
| page        | object | Yes      |                |             |
| integration | string | Yes      | `"Notion"`     |             |
| action      | string | Yes      | `"UpdatePage"` |             |

## Examples

Example 1:

```json
{
  "integration": "Notion",
  "action": "UpdatePage",
  "pageId": "{{trigger.payload.pageId}}",
  "properties": {
    "title": "{{trigger.payload.title}}",
    "status": "{{trigger.payload.status}}"
  }
}
```
