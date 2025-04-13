# Webhook Called

A trigger that fires when a webhook is called

## Properties

| Property | Type   | Required | Const             | Description |
| -------- | ------ | -------- | ----------------- | ----------- |
| path     | string | Yes      |                   |             |
| auth     | any    | No       |                   |             |
| service  | string | Yes      | `"Http"`          |             |
| event    | string | Yes      | `"WebhookCalled"` |             |
