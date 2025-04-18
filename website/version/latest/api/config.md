---
sidebar_position: 1
---

# Config

This is the configuration of the engine.

## Required

### name

`string`

The name of the engine.

```json
{
  "name": "App"
}
```

## Optional

### appVersion

`string`

The version of the application.
The default value is the `version` property of the `package.json` file or `latest`.

```json
{
  "name": "App with app version",
  "appVersion": "1.0.0"
}
```

### engineVersion

`string`

The version of the engine.
The default value is the `version` of the dependency `@latechforce/engine` of the `package.json` file.

```json
{
  "name": "App with engine version",
  "engineVersion": "1.0.0"
}
```

### description

`string`

The description of the application.

```json
{
  "name": "App",
  "description": "App description"
}
```

### forms

Array of [Form](/api/form)

The forms of the application.

### automations

Array of [Automation](/api/automation)

The automations of the application.

### tables

Array of [Table](/api/table)

The tables of the application.

```json
{
  "name": "App",
  "tables": [
    {
      "name": "table_1"
    },
    {
      "name": "table_2"
    }
  ]
}
```

### buckets

Array of [Bucket](/api/bucket)

The buckets of the application.

### integrations

Reference of [Integration](/api/integration)

The integrations of the application.

### services

Reference of [Service](/api/service)

The services of the application.
