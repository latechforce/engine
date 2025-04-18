# Date time

Represents a field that stores a date and time.

## Required

### name

`string`

### type

const: `DateTime`

```json
{
  "name": "App with a table with a date time field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "date_time",
          "type": "DateTime"
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
  "name": "App with a table with a required date time field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "date_time",
          "type": "DateTime",
          "required": true
        }
      ]
    }
  ]
}
```
