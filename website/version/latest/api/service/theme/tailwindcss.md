# TailwindCSS

Configuration schema for the theme service when using TailwindCSS

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with tailwindcss theme",
  "services": {
    "theme": {
      "type": "tailwindcss"
    }
  }
}

await new App().start(config)
```
## Required

### Type

The type of theme to use, must be 'tailwindcss'
>type: const: `tailwindcss`

## Optional

### Base

The base directory path for theme files, relative to the project root
>base?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with tailwindcss theme",
  "services": {
    "theme": {
      "type": "tailwindcss",
      "base": "src/infrastructure/components/tailwindcss"
    }
  }
}

await new App().start(config)
```
