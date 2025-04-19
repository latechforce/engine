# Single select

Represents a field that allows selecting a single option from a predefined list.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `SingleSelect`

### Options

The options of the field.
>options: `string`[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a single select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_select",
          "type": "SingleSelect",
          "options": [
            "Option 1",
            "Option 2",
            "Option 3"
          ]
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
  "name": "App with a table with a required single select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_select",
          "type": "SingleSelect",
          "options": [
            "Option 1",
            "Option 2",
            "Option 3"
          ],
          "required": true
        }
      ]
    }
  ]
}

await new App().start(config)
```
