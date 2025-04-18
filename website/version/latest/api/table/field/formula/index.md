# Formula

Represents a field that calculates a value based on a formula.

## Required

### name

`string`

### type

const: `Formula`

### formula

`string`

### output

Reference of [Output](/api/table/field/formula/output)

```json
{
  "name": "App with a table with a formula field as a single line text and an concatenation",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText"
        },
        {
          "name": "formula",
          "type": "Formula",
          "formula": "single_line_text || \"!\"",
          "output": {
            "type": "SingleLineText"
          }
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
  "name": "App with a table with a required formula field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText",
          "required": true
        },
        {
          "name": "formula",
          "type": "Formula",
          "formula": "single_line_text || \"!\"",
          "output": {
            "type": "SingleLineText"
          },
          "required": true
        }
      ]
    }
  ]
}
```
