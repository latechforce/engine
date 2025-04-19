# Number

Represents a field that stores a numeric value.

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a number field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "number",
          "type": "Number"
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
>type: const: `Number`

## Optional

### Required

Whether the field is required.
The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a required number field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "number",
          "type": "Number",
          "required": true
        }
      ]
    }
  ]
}

await new App().start(config)
```
