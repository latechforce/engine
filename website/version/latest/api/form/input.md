# Input

Configuration for form input fields

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
## Required

### Field

The name of the field this input is associated with
>field: `string`

## Optional

### Label

The display label for the input field
>label?: `string`

### Description

The description of the input field
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
### Placeholder

The placeholder text for the input field
>placeholder?: `string`

### Required

Whether the input field is required
>required?: `boolean`

### Min Length

The minimum length of the input value
>minLength?: `number`

### Max Length

The maximum length of the input value
>maxLength?: `number`

