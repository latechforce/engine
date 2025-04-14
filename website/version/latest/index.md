---
hide_table_of_contents: true
---

# Engine

> Engine is a web app generator that allows you to create web apps with a simple and intuitive schema.
> It is built with TypeScript and Bun$
> Ir is designed to be used by non-technical users to create web apps.

## [Get started](/docs/intro) | [Schema API](/api/config) | [FAQ](https://github.com/latechforce/engine/discussions/categories/q-a) | [Contributing](https://github.com/latechforce/engine/blob/main/CONTRIBUTING.md)

## Installation

```bash
bun add @latechforce/engine
```

## Example

```ts
import { type Config } from '@latechforce/engine'
import App from '@latechforce/engine/bun'

const app = new App()

const config: Config = {
  name: 'My App',
  version: '1.0.0',
  engine: 'latest',
  forms: [
    {
      name: 'My Form',
      path: '/email',
      table: 'mailing_list',
      title: 'Email Form',
      inputs: [{ field: 'email', label: 'Email' }],
    },
  ],
  tables: [
    {
      name: 'mailing_list',
      fields: [{ name: 'email', type: 'Email' }],
    },
  ],
}

const { url } = await app.start(config)
console.log(`Form is available at ${url}/form/email`)
```
