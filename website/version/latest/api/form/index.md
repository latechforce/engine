---
sidebar_position: 2
---

# Form

Defines a form for data input and submission

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

### Name

The name of the form.
>name: `string`

### Path

The URL path where the form is accessible.
>path: `string`

### Table

The name of the table this form is associated with.
>table: `string`

### Inputs

The input fields of the form.
>inputs: [Input](/api/form/input)[]

## Optional

### Title

The display title of the form.
>title?: `string`

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
### Description

The description of the form.
>description?: `string`

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
### Submit label

The text displayed on the submit button.
>submitLabel?: `string`

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
### Success message

The message displayed after successful form submission.
>successMessage?: `string`

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
