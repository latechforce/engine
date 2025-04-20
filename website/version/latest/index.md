---
hide_table_of_contents: true
---

# LTF Engine

> LTF Engine is a web app generator that allows you to create web apps with a simple and intuitive schema.
> It is built with TypeScript and Bun.
> It is designed to be used by non-technical users to create web apps.

## [Get started](/docs/intro) | [Schema API](/api/config) | [FAQ](https://github.com/latechforce/engine/discussions/categories/q-a) | [Contributing](https://github.com/latechforce/engine/blob/main/CONTRIBUTING.md)

## Installation

```bash
bun init
bun add @latechforce/engine
```

## Example

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  name: 'My App',
  forms: [
    {
      name: 'email_form',
      path: '/email',
      table: 'mailing_list',
      title: 'Email Form',
      inputs: [
        {
          field: 'email',
          label: 'Email',
        },
      ],
    },
  ],
  tables: [
    {
      name: 'mailing_list',
      fields: [
        {
          name: 'email',
          type: 'Email',
        },
      ],
    },
  ],
}

const { url } = await new App().start(config)

console.log(`Form is available at ${url}/form/email`)
```
