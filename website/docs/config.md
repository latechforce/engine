---
  sidebar_position: 1
---

# Config

This is the configuration of the engine.

## Properties

| Property | Type | Required | Const | Description |
|----------|------|----------|-------|-------------|
| name | string | Yes |  | The name of the engine |
| version | string | Yes |  | The version of the config |
| engine | string | Yes |  | The version of the engine |
| description | string | No |  | The description of the engine |
| forms | array | No |  | The forms of the engine |
| automations | array | No |  | The automations of the engine |
| tables | array | No |  | The tables of the engine |
| buckets | array | No |  | The buckets of the engine |
| integrations | [Integration](/docs/integration) | No |  | The integrations of the engine |
| server | object | No |  | The server of the engine |
| database | object | No |  | The database of the engine |
| monitors | array | No |  | The monitors of the engine |
| loggers | array | No |  | The loggers of the engine |
| tunnel | object | No |  | The tunnel of the engine |
| theme | any | No |  | The themes of the engine |

