# Long text

Represents a field that stores multiple lines of text.

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a long text field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "long_text",
          "type": "LongText"
        }
      ]
    }
  ]
}

await new App().start(config)
```
## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `LongText`

## Optional

### Required

Whether the field is required.
The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a required long text field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "long_text",
          "type": "LongText",
          "required": true
        }
      ]
    }
  ]
}

await new App().start(config)
```
