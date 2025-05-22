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