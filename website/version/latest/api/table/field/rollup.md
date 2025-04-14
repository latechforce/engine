# Rollup

## Description

Represents a field that aggregates data from linked records

## Properties

| Name                 | Type            | Required | Description |
| -------------------- | --------------- | -------- | ----------- |
| multipleLinkedRecord | string          | ✔       |             |
| type                 | const: `Rollup` | ✔       |             |
| formula              | string          | ✔       |             |
| linkedRecordField    | string          | ✔       |             |
| output               | Object          | ✔       |             |
| name                 | string          | ✔       |             |
| required             | boolean         |          |             |
| onMigration          | Object          |          |             |

## Property Details

### output

| Property    | Type                                                     | Required | Description |
| ----------- | -------------------------------------------------------- | -------- | ----------- |
| type        | enum: `Number`, `LongText`, `SingleLineText`, `DateTime` | ✔       |             |
| required    | boolean                                                  |          |             |
| onMigration | Object                                                   |          |             |

### onMigration

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| replace  | string |          |             |

## Example

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
