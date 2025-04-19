# Rollup

Represents a field that aggregates values from linked records.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `Rollup`

### Formula

The formula expression to calculate the aggregated value.
>formula: `string`

### Multiple Linked Record

The name of the multiple linked record field to aggregate values from.
>multipleLinkedRecord: `string`

### Linked Record Field

The name of the field in the linked record table to aggregate values from.
>linkedRecordField: `string`

### Output

The output type configuration for the rollup field.
>output: [Output](/api/table/field/rollup/output)

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
## Optional

### Required

Whether the field is required.
The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a required rollup field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2",
          "required": true
        },
        {
          "name": "rollup",
          "type": "Rollup",
          "multipleLinkedRecord": "multiple_linked_record",
          "linkedRecordField": "single_line_text",
          "formula": "CONCAT(values, ', ')",
          "output": {
            "type": "SingleLineText"
          },
          "required": true
        }
      ]
    },
    {
      "name": "table_2",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText",
          "required": true
        }
      ]
    }
  ]
}

await new App().start(config)
```
