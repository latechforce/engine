# Theme

Configuration for the theme service

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
The default configuration is:

```json
{
  "type": "tailwindcss"
}
```

## Any of

- [Tailwindcss](/api/service/theme/tailwindcss)

- [None](/api/service/theme/none)

