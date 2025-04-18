---
sidebar_position: 4
---

# Table

Defines the structure of a database table

## Required

### name

`string`

The unique identifier for the table

```json
{
  "name": "App with a table with a name",
  "tables": [
    {
      "name": "table"
    }
  ]
}
```

## Optional

### schema

`string`

The database schema where the table is located

```json
{
  "name": "App with a table with a schema",
  "tables": [
    {
      "name": "table",
      "schema": "private"
    }
  ]
}
```

### fields

Array of [Field](/api/table/field)

Array of field definitions for the table

```json
{
  "name": "App with a table with a name and multiple fields",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText"
        },
        {
          "name": "number",
          "type": "Number"
        },
        {
          "name": "date_time",
          "type": "DateTime"
        }
      ]
    }
  ]
}
```
