---
sidebar_position: 4
---

# Table

Defines the structure of a database table

## Required

### Name

The unique identifier for the table
>name: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a name",
  "tables": [
    {
      "name": "table"
    }
  ]
}

await new App().start(config)
```
## Optional

### Schema

The database schema where the table is located
The default value is public.
>schema?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a schema",
  "tables": [
    {
      "name": "table",
      "schema": "private"
    }
  ]
}

await new App().start(config)
```
### Fields

Array of field definitions for the table
>fields?: [Field](/api/table/field)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a table with a name and multiple fields",
  "tables": [
    {
      "name": "table",
      "fields": [
        {
          "name": "single_line_text",
          "type": "SingleLineText"
        },
        {
          "name": "number",
          "type": "Number"
        },
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
