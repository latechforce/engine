# Multiple select

Represents a field that allows selecting multiple options from a predefined list.

## Required

### name

`string`

### type

const: `MultipleSelect`

### options

Array of `string`

```json
{
  "name": "App with a table with a multiple select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "multiple_select",
          "type": "MultipleSelect",
          "options": ["Option 1", "Option 2", "Option 3"]
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
  "name": "App with a table with a required multiple select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "multiple_select",
          "type": "MultipleSelect",
          "options": ["Option 1", "Option 2", "Option 3"],
          "required": true
        }
      ]
    }
  ]
}
```
