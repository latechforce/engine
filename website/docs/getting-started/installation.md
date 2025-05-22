---
sidebar_position: 1
---

# Installation

## Requirements

LTF Engine is built on top of [Bun](https://bun.sh/), a fast and secure runtime for JavaScript and TypeScript.

You can install it with the following command.

### macOS/Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

### Windows

```powershell
powershell -c "irm https://bun.sh/install.ps1 | iex"
```

## Scaffold project app

### From template

You can also use a template to create a new project.

```bash
bun create latechforce/engine-template my-app
```

Open the project.

```bash
$ cd my-app
```

Start developing!

```bash
bun dev
```

And your app will be available at `http://localhost:3000`.

### From scratch

Create a new directory for your project and navigate into it.

```bash
$ mkdir my-app
$ cd my-app
```

Initialize a new Bun project.

```bash
bun init
```

Install LTF Engine:

```bash
bun add @latechforce/engine
```

Create a new bunfig.toml file with the TailwindCSS plugin, required to compile the app CSS.

```toml title="bunfig.toml"
[serve.static]
plugins = ["bun-plugin-tailwind"]
```

Edit the `index.ts` file to configure the app.

```ts title="index.ts"
import { App, type AppSchema } from '@latechforce/engine'

const schema: AppSchema = {
  name: 'My app',
  version: '0.0.1',
  description: 'My app description',
}

await new App().start(schema)
```

Start developing!

```bash
bun dev
```

And your app will be available at `http://localhost:3000`.
