# Calendly

## Description

A configuration schema for Calendly scheduling integration

## Properties

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| name    | string | ✔       |             |
| baseUrl | string |          |             |
| user    | Object | ✔       |             |

## Property Details

### user

| Property    | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| accessToken | string | ✔       |             |

## Example

```json
{
  "name": "scheduling",
  "user": {
    "accessToken": "1234567890ABCD"
  }
}
```
