# Number

Represents a field that stores a numeric value.

## Required

### name

>name: `string`

### type

>type: const: `Number`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a number field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "number",
          "type": "Number"
        }
      ]
    }
  ]
}

await new App().start(config)
```
## Optional

### required

The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a required number field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "number",
          "type": "Number",
          "required": true
        }
      ]
    }
  ]
}

await new App().start(config)
```
