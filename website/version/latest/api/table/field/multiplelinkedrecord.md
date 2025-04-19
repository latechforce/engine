# Multiple linked record

Represents a field that links to multiple records in another table.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `MultipleLinkedRecord`

### Table

The name of the table to link to.
>table: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a multiple linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2"
        }
      ]
    },
    {
      "name": "table_2"
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
  "name": "App with a table with a required multiple linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "multiple_linked_record",
          "type": "MultipleLinkedRecord",
          "table": "table_2",
          "required": true
        }
      ]
    },
    {
      "name": "table_2"
    }
  ]
}

await new App().start(config)
```
