# Checkbox

Represents a boolean checkbox field in forms and tables.

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `Checkbox`

## Optional

### Required

Whether the field is required.
The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
