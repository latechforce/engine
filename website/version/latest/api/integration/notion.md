# Notion

## Description

A configuration schema for Notion integration

## Properties

| Name            | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| name            | string | ✔       |             |
| baseUrl         | string |          |             |
| token           | string | ✔       |             |
| pollingInterval | number |          |             |

## Example

```json
{
  "name": "project-management",
  "token": "secret_1234567890ABCD",
  "pollingInterval": 300000
}
```
