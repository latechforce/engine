# Airtable

A configuration schema for Airtable integration

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  |  |
| baseUrl | string | No |  |  |
| apiKey | string | Yes |  |  |
| databaseId | string | Yes |  |  |

## Examples

Example 1:

```json
{
  "name": "main-database",
  "apiKey": "key1234567890ABCD",
  "databaseId": "app1234567890ABCD"
}
```

