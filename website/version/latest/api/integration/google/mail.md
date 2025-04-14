# Mail

## Description

A configuration schema for Gmail integration

## Properties

| Name     | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| name     | string | ✔       |             |
| baseUrl  | string |          |             |
| user     | string | ✔       |             |
| password | string | ✔       |             |

## Example

```json
{
  "name": "support-email",
  "user": "support@company.com",
  "password": "app-specific-password"
}
```
