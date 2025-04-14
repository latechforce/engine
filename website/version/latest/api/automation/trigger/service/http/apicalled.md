# Api Called

## Description

A trigger that fires when an API is called

## Properties

| Name    | Type               | Required | Description |
| ------- | ------------------ | -------- | ----------- |
| path    | string             | ✔       |             |
| input   | Object             |          |             |
| output  | Object             |          |             |
| auth    | const: `ApiKey`    |          |             |
| service | const: `Http`      | ✔       |             |
| event   | const: `ApiCalled` | ✔       |             |

## Property Details

### input

| Property             | Type                                                   | Required | Description |
| -------------------- | ------------------------------------------------------ | -------- | ----------- |
| type                 | enum: `string`, `number`, `boolean`, `array`, `object` |          |             |
| properties           | Object                                                 |          |             |
| enum                 | Array&lt;string&gt;                                    |          |             |
| items                | unknown                                                |          |             |
| required             | Array&lt;string&gt;                                    |          |             |
| additionalProperties | boolean                                                |          |             |
| oneOf                | Array&lt;unknown&gt;                                   |          |             |
