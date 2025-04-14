# Update Page

## Description

Updates a page in Notion with the specified properties

## Properties

| Name        | Type                | Required | Description |
| ----------- | ------------------- | -------- | ----------- |
| name        | string              | ✔       |             |
| account     | string              | ✔       |             |
| table       | string              | ✔       |             |
| id          | string              | ✔       |             |
| page        | Object              | ✔       |             |
| integration | const: `Notion`     | ✔       |             |
| action      | const: `UpdatePage` | ✔       |             |

## Example

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
