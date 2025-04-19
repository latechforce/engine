# Single attachment

Represents a field that stores a single attachment.

## Required

### name

>name: `string`

### type

>type: const: `SingleAttachment`

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
## Optional

### required

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
