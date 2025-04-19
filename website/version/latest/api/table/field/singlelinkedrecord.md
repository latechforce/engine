# Single linked record

Represents a field that links to a single record in another table.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `SingleLinkedRecord`

### Table

The name of the table to link to.
>table: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a single linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "single_linked_record",
          "type": "SingleLinkedRecord",
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
  "name": "App with a table with a required single linked record field",
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "single_linked_record",
          "type": "SingleLinkedRecord",
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
