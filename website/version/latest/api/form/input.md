# Input

Type alias for input configuration

## Required

### field

>field: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a form",
  "forms": [
    {
      "name": "form",
      "path": "/path",
      "table": "table",
      "inputs": [
        {
          "field": "single_line_text",
          "label": "Single Line Text"
        }
      ]
    }
  ],
  "tables": [
    {
      "name": "table",
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

### label

>label?: `string`

### description

>description?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a form with a description",
  "forms": [
    {
      "name": "form",
      "path": "/path",
      "description": "Form description",
      "table": "table",
      "inputs": [
        {
          "field": "single_line_text",
          "label": "Single Line Text"
        }
      ]
    }
  ],
  "tables": [
    {
      "name": "table",
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
### placeholder

>placeholder?: `string`

### required

>required?: `boolean`

### minLength

>minLength?: `number`

### maxLength

>maxLength?: `number`

