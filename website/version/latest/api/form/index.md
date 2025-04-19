---
sidebar_position: 2
---

# Form

Type alias for form configuration

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

### inputs

>inputs: [Input](/api/form/input)[]

### name

>name: `string`

### path

>path: `string`

### table

>table: `string`

## Optional

### title

>title?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a form with a title",
  "forms": [
    {
      "name": "form",
      "path": "/path",
      "title": "Form title",
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
### submitLabel

>submitLabel?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a form with a submit label",
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
      ],
      "submitLabel": "Save"
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
### successMessage

>successMessage?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a form with a success message",
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
      ],
      "successMessage": "Success"
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
