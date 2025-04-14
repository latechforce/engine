# Url

## Description

Represents a field that stores a URL

## Properties

| Name        | Type         | Required | Description |
| ----------- | ------------ | -------- | ----------- |
| name        | string       | ✔       |             |
| required    | boolean      |          |             |
| onMigration | Object       |          |             |
| type        | const: `Url` | ✔       |             |

## Property Details

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

```json
{
  "type": "Url",
  "name": "website",
  "required": true
}
```
