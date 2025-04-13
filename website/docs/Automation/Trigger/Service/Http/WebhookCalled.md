# Webhook Called

A trigger that fires when a webhook is called

## Schema Overview

| Property | Value |
|----------|-------|
| Type | `object` |

## Properties

### path

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |

### auth

| Property | Value |
|----------|-------|
| Type | any |
| Required | No |

### service

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"Http"` |

### event

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"WebhookCalled"` |

