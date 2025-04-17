# Email

Represents a field that stores an email address.

## Required

### name

`string`

### type

const: `Email`

```json
{
  "name": "App with a table with an email field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "email",
          "type": "Email"
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
  "name": "App with a table with a required email field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "email",
          "type": "Email",
          "required": true
        }
      ]
    }
  ]
}
```
