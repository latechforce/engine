# Single attachment

Represents a field that stores a single attachment.

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `SingleAttachment`

## Optional

### Required

Whether the field is required.
The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
