# Rollup

Represents a field that aggregates values from linked records.

## Required

### name

`string`

### type

const: `Rollup`

### formula

`string`

### multipleLinkedRecord

`string`

The multiple linked record field to aggregate values from.

### linkedRecordField

`string`

The field of the multiple linked record table to aggregate values from.

### output

Reference of [Output](/api/table/field/rollup/output)

The output type of the rollup field.

```json
{
  "name": "App with a table with a rollup field as a single line text and a CONCAT formula",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2"
        },
        {
          "name": "rollup",
          "type": "Rollup",
          "multipleLinkedRecord": "multiple_linked_record",
          "linkedRecordField": "single_line_text",
          "formula": "CONCAT(values, ', ')",
          "output": {
            "type": "SingleLineText"
          }
        }
      ]
    },
    {
      "name": "table_2",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText"
        }
      ]
    }
  ]
}
```

## Optional

### required

`boolean`

The default value is `false`.

```json
{
  "name": "App with a table with a required rollup field as a single line text and a CONCAT formula",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2",
          "required": true
        },
        {
          "name": "rollup",
          "type": "Rollup",
          "multipleLinkedRecord": "multiple_linked_record",
          "linkedRecordField": "single_line_text",
          "formula": "CONCAT(values, ', ')",
          "output": {
            "type": "SingleLineText"
          },
          "required": true
        }
      ]
    },
    {
      "name": "table_2",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText",
          "required": true
        }
      ]
    }
  ]
}
```
