# Output

Represents the output type configuration of a formula field.

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
## Required

### Type

The type of the output field.
>type: enum: `Number`, `LongText`, `SingleLineText`, `DateTime`

