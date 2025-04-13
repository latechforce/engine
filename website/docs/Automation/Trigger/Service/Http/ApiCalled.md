# Api Called

A trigger that fires when an API is called

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

### input

| Property | Value |
|----------|-------|
| Type | object |
| Required | No |

### output

| Property | Value |
|----------|-------|
| Type | object |
| Required | No |

### auth

| Property | Value |
|----------|-------|
| Type | string |
| Required | No |
| Const | `"ApiKey"` |

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
| Const | `"ApiCalled"` |

