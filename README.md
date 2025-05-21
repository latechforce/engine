# LTF Engine

LTF Engine is a NPM package that generate a web application from a JSON configuration. This package is under Fair Use License.

## Requirements

We use [Bun](https://bun.sh/) 1.2 or later to run the engine.

## Installation

Install the engine in your Bun project like any other NPM package:

```bash
bun add @latechforce/engine
```

## Usage

Create a new file `index.ts` and import the engine:

```ts
import App from '@latechforce/engine'

const app = await new App().start({
  name: 'My fantastic app',
  version: '1.0.0',
})

console.log(`App is running at ${app.url()}`)
```

## License

Copyright (c) 2024-present Thomas JEANNEAU, La Tech Force (thomas.jeanneau@latechforce.com). This source code is licensed under a Fair Use License found in the [LICENSE](https://github.com/latechforce/engine/blob/main/LICENSE.md).
