---
sidebar_position: 1
---

# Config

This is the configuration of the engine.

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
## Required

### Name

The name of the engine.
>name: `string`

## Optional

### App version

The version of the application.
The default value is the `version` property of the `package.json` file or `latest`.
>appVersion?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Engine version

The version of the engine.
The default value is the `version` of the dependency `@latechforce/engine` of the `package.json` file.
>engineVersion?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Description

The description of the application.
>description?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Forms

The forms of the application.
>forms?: [Form](/api/form)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Automations

The automations of the application.
>automations?: [Automation](/api/automation)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Tables

The tables of the application.
>tables?: [Table](/api/table)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Buckets

The buckets of the application.
>buckets?: [Bucket](/api/bucket)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Integrations

The integrations of the application.
>integrations?: [Integration](/api/integration)

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
### Services

The services of the application.
>services?: [Service](/api/service)

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App"
}

await new App().start(config)
```
