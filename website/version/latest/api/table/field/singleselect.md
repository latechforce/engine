# Single select

Represents a field that allows selecting a single option from a predefined list.

## Required

### name

`string`

### type

const: `SingleSelect`

### options

Array of `string`

```json
{
  "name": "App with a table with a single select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_select",
          "type": "SingleSelect",
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
  "name": "App with a table with a required single select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_select",
          "type": "SingleSelect",
          "options": ["Option 1", "Option 2", "Option 3"],
          "required": true
        }
      ]
    }
  ]
}
```
