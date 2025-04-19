# Single select

Represents a field that allows selecting a single option from a predefined list.

## Required

### name

>name: `string`

### type

>type: const: `SingleSelect`

### options

>options: `string`[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a single select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_select",
          "type": "SingleSelect",
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
## Optional

### required

The default value is `false`.
>required?: `boolean`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a required single select field",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_select",
          "type": "SingleSelect",
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
