# Calendly

A configuration schema for Calendly scheduling integration

## Properties

| Property | Type   | Required | Const | Description |
| -------- | ------ | -------- | ----- | ----------- |
| name     | string | Yes      |       |             |
| baseUrl  | string | No       |       |             |
| user     | object | Yes      |       |             |

## Examples

Example 1:

```json
{
  "name": "scheduling",
  "user": {
    "accessToken": "1234567890ABCD"
  }
}
```
