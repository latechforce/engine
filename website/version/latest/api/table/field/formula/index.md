# Formula

Represents a field that calculates a value based on a formula.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `Formula`

### Formula

The formula expression to calculate the field value.
>formula: `string`

### Output

The output type configuration for the formula field.
>output: [Output](/api/table/field/formula/output)

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a formula field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText"
        },
        {
          "name": "formula",
          "type": "Formula",
          "formula": "single_line_text || \"!\"",
          "output": {
            "type": "SingleLineText"
          }
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
  "name": "App with a table with a required formula field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText",
          "required": true
        },
        {
          "name": "formula",
          "type": "Formula",
          "formula": "single_line_text || \"!\"",
          "output": {
            "type": "SingleLineText"
          },
          "required": true
        }
      ]
    }
  ]
}

await new App().start(config)
```
