# Single line text

Represents a field that stores a single line of text.

## Required

### name

`string`

### type

const: `SingleLineText`

```json
{
  "name": "App with a table with a single line text field",
  "tables": [
    {
      "name": "table",
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
  "name": "App with a table with a required single line text field",
  "tables": [
    {
      "name": "table",
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
