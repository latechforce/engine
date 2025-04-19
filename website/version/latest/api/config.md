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
  "name": "App with app version",
  "appVersion": "1.0.0"
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
  "name": "App with engine version",
  "engineVersion": "1.0.0"
}

await new App().start(config)
```
### Description

The description of the application.
>description?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App",
  "description": "App description"
}

await new App().start(config)
```
### Forms

The forms of the application.
>forms?: [Form](/api/form)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with forms",
  "forms": [
    {
      "name": "form_1",
      "path": "/form_1",
      "table": "table_1",
      "inputs": [
        {
          "field": "field_1",
          "label": "Field 1"
        }
      ]
    },
    {
      "name": "form_2",
      "path": "/form_2",
      "table": "table_2",
      "inputs": [
        {
          "field": "field_2",
          "label": "Field 2"
        }
      ]
    }
  ],
  "tables": [
    {
      "name": "table_1",
      "fields": [
        {
          "name": "field_1",
          "type": "SingleLineText"
        }
      ]
    },
    {
      "name": "table_2",
      "fields": [
        {
          "name": "field_2",
          "type": "SingleLineText"
        }
      ]
    }
  ]
}

await new App().start(config)
```
### Automations

The automations of the application.
>automations?: [Automation](/api/automation)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with automations",
  "automations": [
    {
      "name": "automation_1",
      "trigger": {
        "service": "Schedule",
        "event": "CronTimeTicked",
        "cronTime": "0 0 * * *"
      },
      "actions": [
        {
          "name": "action_1",
          "service": "Code",
          "action": "RunJavascript",
          "code": "async function() { console.log(\"Hello, world!\") }"
        }
      ]
    },
    {
      "name": "automation_2",
      "trigger": {
        "service": "Http",
        "event": "WebhookCalled",
        "path": "/webhook_1"
      },
      "actions": [
        {
          "name": "action_1",
          "service": "Code",
          "action": "RunJavascript",
          "code": "async function() { console.log(\"Hello, world!\") }"
        }
      ]
    }
  ]
}

await new App().start(config)
```
### Tables

The tables of the application.
>tables?: [Table](/api/table)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with tables",
  "tables": [
    {
      "name": "table_1"
    },
    {
      "name": "table_2"
    }
  ]
}

await new App().start(config)
```
### Buckets

The buckets of the application.
>buckets?: [Bucket](/api/bucket)[]

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with buckets",
  "buckets": [
    {
      "name": "bucket_1"
    },
    {
      "name": "bucket_2"
    }
  ]
}

await new App().start(config)
```
### Integrations

The integrations of the application.
>integrations?: [Integration](/api/integration)

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with integrations",
  "integrations": {
    "notion": [
      {
        "account": "notion_account",
        "token": "notion_token"
      }
    ],
    "qonto": [
      {
        "account": "qonto_account",
        "organisationSlug": "qonto_organisation_slug",
        "secretKey": "qonto_secret_key"
      }
    ]
  }
}

await new App().start(config)
```
### Services

The services of the application.
>services?: [Service](/api/service)

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with services",
  "services": {
    "server": {
      "port": 3000
    },
    "database": {
      "type": "SQLite",
      "url": "./tmp/database.sqlite"
    }
  }
}

await new App().start(config)
```
