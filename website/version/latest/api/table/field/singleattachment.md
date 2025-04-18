# Single attachment

Represents a field that stores a single attachment.

## Required

### name

`string`

### type

const: `SingleAttachment`

```json
{
  "name": "App with a table with a single attachment field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_attachment",
          "type": "SingleAttachment"
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
  "name": "App with a table with a required single attachment field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_attachment",
          "type": "SingleAttachment",
          "required": true
        }
      ]
    }
  ]
}
```
