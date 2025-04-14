---
sidebar_position: 3
---

# Automation

Defines an automation workflow with triggers and actions

## Properties

| Property    | Type                                         | Required | Const | Description |
| ----------- | -------------------------------------------- | -------- | ----- | ----------- |
| name        | string                                       | Yes      |       |             |
| summary     | string                                       | No       |       |             |
| description | string                                       | No       |       |             |
| trigger     | [TriggerAutomation](/api/automation/trigger) | Yes      |       |             |
| actions     | array                                        | Yes      |       |             |
