# Number

Represents a field that stores a numeric value.

## Required

### name

`string`

### type

const: `Number`

```json
{
  "name": "App with a table with a number field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "number",
          "type": "Number"
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
  "name": "App with a table with a required number field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "number",
          "type": "Number",
          "required": true
        }
      ]
    }
  ]
}
```
