# Output

Represents the output type configuration of a rollup field.

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a rollup field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2"
        },
        {
          "name": "rollup",
          "type": "Rollup",
          "multipleLinkedRecord": "multiple_linked_record",
          "linkedRecordField": "single_line_text",
          "formula": "CONCAT(values, ', ')",
          "output": {
            "type": "SingleLineText"
          }
        }
      ]
    },
    {
      "name": "table_2",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText"
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

