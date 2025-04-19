# None

Configuration schema for the theme service when using none

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with theme",
  "services": {
    "theme": {
      "type": "tailwindcss",
      "base": "src/components"
    }
  }
}

await new App().start(config)
```
## Required

### Type

The type of theme to use, must be 'none'
>type: const: `none`

