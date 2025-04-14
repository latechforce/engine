# Qonto

## Description

A configuration schema for Qonto banking integration

## Properties

| Name             | Type   | Required | Description |
| ---------------- | ------ | -------- | ----------- |
| name             | string | ✔       |             |
| baseUrl          | string |          |             |
| organisationSlug | string | ✔       |             |
| secretKey        | string | ✔       |             |
| stagingToken     | string |          |             |

## Example

```json
{
  "name": "business-account",
  "organisationSlug": "my-company",
  "secretKey": "1234567890ABCD",
  "stagingToken": "staging_1234567890ABCD"
}
```
