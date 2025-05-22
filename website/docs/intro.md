---
sidebar_position: 1
---

# Introduction

## What is LTF Engine?

LTF Engine is a web application generation engine. It's a simple NPM package with a Fair Use license that allows you to launch a server with a database, APIs, a web client, etc... from a single configuration file.

## Why LTF Engine?

LTF Engine is designed to combine the best of both Code and No Code worlds. It allows you to easily create a complete web application with minimal code.

The idea is to recreate the classic No Code development experience like with Zapier, Airtable, or JotForm, but with the power of Code, particularly by enabling the use of collaboration and versioning tools and complete application hosting.

LTF Engine aims to allow you to create your own custom information system without needing to know code, while maintaining the ability to optimize and adapt it to your needs quickly while having complete control over the code and database.

## How does it work?

LTF Engine is built on top of [Bun](https://bun.sh/), a fast and secure runtime for JavaScript and TypeScript.

You can configure an application in few lines of code.

```ts file="index.ts"
import App from '@latechforce/engine'

await new App().start({
  name: 'My App',
  version: '1.0.0',
})
```

You can then start the application with the following command:

```bash
bun run index.ts
```

And your app will be available at `http://localhost:3000`.

All you have to do then is to configure your application following the [app schema](/schema). 
