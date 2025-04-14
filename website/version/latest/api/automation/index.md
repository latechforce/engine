---
sidebar_position: 3
---

# Automation

## Description

Defines an automation workflow with triggers and actions

## Properties

| Name        | Type                                          | Required | Description |
| ----------- | --------------------------------------------- | -------- | ----------- |
| name        | string                                        | ✔       |             |
| summary     | string                                        |          |             |
| description | string                                        |          |             |
| trigger     | Reference: [Trigger](/api/automation/trigger) | ✔       |             |
| actions     | Array of [Action](/api/automation/action)     | ✔       |             |
