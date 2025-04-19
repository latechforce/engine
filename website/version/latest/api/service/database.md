# Database

Configuration for the database service

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with a database",
  "services": {
    "database": {
      "type": "PostgreSQL",
      "url": "postgresql://postgres:postgres@localhost:5432/postgres"
    }
  }
}

await new App().start(config)
```
The default configuration is:

```json
{
  "type": "SQLite",
  "url": ":memory:"
}
```

## Required

### Type

The type of database to use.
>type: enum: `PostgreSQL`, `SQLite`

### URL

The URL of the database.
>url: `string`

