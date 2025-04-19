# Multiple attachment

Represents a field that stores multiple attachments.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `MultipleAttachment`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
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

await new App().start(config)
```
