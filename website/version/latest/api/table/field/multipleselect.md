# Multiple select

Represents a field that allows selecting multiple options from a predefined list.

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a multiple select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "multiple_select",
          "type": "MultipleSelect",
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
## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `MultipleSelect`

### Options

The options of the field.
>options: `string`[]

## Optional

### Required

Whether the field is required.
The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a required multiple select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "multiple_select",
          "type": "MultipleSelect",
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
