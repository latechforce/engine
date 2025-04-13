# Rollup

Represents a field that aggregates data from linked records

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| multipleLinkedRecord | string | Yes |  |  |
| type | string | Yes | `"Rollup"` |  |
| formula | string | Yes |  |  |
| linkedRecordField | string | Yes |  |  |
| output | object | Yes |  |  |
| name | string | Yes |  |  |
| required | boolean | No |  |  |
| onMigration | object | No |  |  |

## Examples

Example 1:

```json
{
  "type": "Rollup",
  "name": "totalSales",
  "required": false,
  "multipleLinkedRecord": "orders",
  "linkedRecordField": "amount",
  "formula": "sum(amount)",
  "output": {
    "type": "Number",
    "name": "totalSales"
  }
}
```

