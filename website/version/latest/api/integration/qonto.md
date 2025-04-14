# Qonto

A configuration schema for Qonto banking integration

## Properties

| Property         | Type   | Required | Const | Description |
| ---------------- | ------ | -------- | ----- | ----------- |
| name             | string | Yes      |       |             |
| baseUrl          | string | No       |       |             |
| organisationSlug | string | Yes      |       |             |
| secretKey        | string | Yes      |       |             |
| stagingToken     | string | No       |       |             |

## Examples

Example 1:

```json
{
  "name": "business-account",
  "organisationSlug": "my-company",
  "secretKey": "1234567890ABCD",
  "stagingToken": "staging_1234567890ABCD"
}
```
