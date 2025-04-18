# Multiple attachment

Represents a field that stores multiple attachments.

## Required

### name

`string`

### type

const: `MultipleAttachment`

```json
{
  "name": "App with a table with a multiple attachment field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "multiple_attachment",
          "type": "MultipleAttachment"
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
  "name": "App with a table with a required multiple attachment field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "multiple_attachment",
          "type": "MultipleAttachment",
          "required": true
        }
      ]
    }
  ]
}
```
