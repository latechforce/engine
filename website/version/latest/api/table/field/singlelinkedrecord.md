# Single linked record

Represents a field that links to a single record in another table.

## Required

### name

`string`

### type

const: `SingleLinkedRecord`

### table

`string`

```json
{
  "name": "App with a table with a single linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "single_linked_record",
          "type": "SingleLinkedRecord",
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
  "name": "App with a table with a required single linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "single_linked_record",
          "type": "SingleLinkedRecord",
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
