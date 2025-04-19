# Output

Represents the output type of a formula field.

## Required

### type

>type: enum: `Number`, `LongText`, `SingleLineText`, `DateTime`

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
