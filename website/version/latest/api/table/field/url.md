# Url

Represents a field that stores an URL.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `Url`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
