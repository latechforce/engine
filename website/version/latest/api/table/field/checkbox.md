# Checkbox

Represents a boolean checkbox field in forms and tables.

## Required

### name

`string`

### type

const: `Checkbox`

```json
{
  "name": "App with a table with a checkbox field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "checkbox",
          "type": "Checkbox"
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
  "name": "App with a table with a required checkbox field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "checkbox",
          "type": "Checkbox",
          "required": true
        }
      ]
    }
  ]
}
```
