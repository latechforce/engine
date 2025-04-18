# Url

Represents a field that stores an URL.

## Required

### name

`string`

### type

const: `Url`

```json
{
  "name": "App with a table with a url field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "url",
          "type": "Url"
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
  "name": "App with a table with a required url field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "url",
          "type": "Url",
          "required": true
        }
      ]
    }
  ]
}
```
