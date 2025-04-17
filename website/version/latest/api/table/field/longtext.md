# Long text

Represents a field that stores multiple lines of text.

## Required

### name

`string`

### type

const: `LongText`

```json
{
  "name": "App with a table with a long text field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "long_text",
          "type": "LongText"
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
  "name": "App with a table with a required long text field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "long_text",
          "type": "LongText",
          "required": true
        }
      ]
    }
  ]
}
```
