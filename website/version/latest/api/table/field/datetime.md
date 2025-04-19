# Date time

Represents a field that stores a date and time.

## Required

### Name

The name of the field.
>name: `string`

### Type

The type of the field.
>type: const: `DateTime`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a date time field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "date_time",
          "type": "DateTime"
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
  "name": "App with a table with a required date time field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "date_time",
          "type": "DateTime",
          "required": true
        }
      ]
    }
  ]
}

await new App().start(config)
```
