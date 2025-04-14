# Airtable

## Description

A configuration schema for Airtable integration

## Properties

| Name       | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| name       | string | ✔       |             |
| baseUrl    | string |          |             |
| apiKey     | string | ✔       |             |
| databaseId | string | ✔       |             |

## Example

```json
{
  "name": "main-database",
  "apiKey": "key1234567890ABCD",
  "databaseId": "app1234567890ABCD"
}
```
