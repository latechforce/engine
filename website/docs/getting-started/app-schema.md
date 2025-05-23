---
sidebar_position: 2
---

# App Schema

The app schema is the main schema of the app. It is used to define the structure of the app.

To explore the app schema, you can use our [schema explorer](/schema-explorer).

## Metadata

You can define the metadata of the app at the root of the schema.

```json
{
  "name": "My App",
  "version": "1.0.0",
  "description": "My App Description"
}
```

## Automations

An automation is a collection of actions that are triggered by an event.

```json
{
  "automations": [
    {
      "name": "My Automation",
      "trigger": {
        "service": "http",
        "event": "GET",
        "path": "/my-automation"
      },
      "actions": [
        {
          "name": "My Action",
          "service": "http",
          "event": "response",
          "body": {
            "message": "Hello, world!"
          }
        }
      ]
    }
  ]
```

## Using Environment Variables

You can use environment variables anywhere in the app schema.
It will be replaced with the value of the environment variable at runtime.

```json
{
  "name": "{{env.NAME}}"
}
```

You can also provide a default value if the environment variable is not found.

```json
{
  "name": "{{env.NAME "default"}}",
}
```
