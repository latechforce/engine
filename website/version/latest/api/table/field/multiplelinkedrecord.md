# Multiple linked record

Represents a field that links to multiple records in another table.

## Required

### name

`string`

### type

const: `MultipleLinkedRecord`

### table

`string`

```json
{
  "name": "App with a table with a multiple linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2"
        }
      ]
    },
    {
      "name": "table_2"
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
  "name": "App with a table with a required multiple linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2",
          "required": true
        }
      ]
    },
    {
      "name": "table_2"
    }
  ]
}
```
