# Api Called

A trigger that fires when an API is called

## Properties

| Property | Type   | Required | Const         | Description |
| -------- | ------ | -------- | ------------- | ----------- |
| path     | string | Yes      |               |             |
| input    | object | No       |               |             |
| output   | object | No       |               |             |
| auth     | string | No       | `"ApiKey"`    |             |
| service  | string | Yes      | `"Http"`      |             |
| event    | string | Yes      | `"ApiCalled"` |             |
