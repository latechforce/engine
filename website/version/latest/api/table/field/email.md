# Email

Represents a field that stores an email address.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `Email`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
## Optional

### Required

Whether the field is required.
The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
