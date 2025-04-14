---
sidebar_position: 1
---

# Config

## Description

This is the configuration of the engine.

## Properties

| Name         | Type                                       | Required | Description                    |
| ------------ | ------------------------------------------ | -------- | ------------------------------ |
| name         | string                                     | ✔       | The name of the engine         |
| version      | string                                     | ✔       | The version of the config      |
| engine       | string                                     | ✔       | The version of the engine      |
| description  | string                                     |          | The description of the engine  |
| forms        | Array of [Form](/api/form)                 |          | The forms of the engine        |
| automations  | Array of [Automation](/api/automation)     |          | The automations of the engine  |
| tables       | Array of [Table](/api/table)               |          | The tables of the engine       |
| buckets      | Array of [Bucket](/api/bucket)             |          | The buckets of the engine      |
| integrations | Reference: [Integration](/api/integration) |          | The integrations of the engine |
| services     | Reference: [Service](/api/service)         |          | The services of the engine     |
