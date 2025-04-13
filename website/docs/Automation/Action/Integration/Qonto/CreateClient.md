# Create Client

Creates a new client in Qonto with the specified details

## Schema Overview

| Property | Value |
|----------|-------|
| Type | `object` |

## Properties

### name

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |

### account

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |

### client

| Property | Value |
|----------|-------|
| Type | object |
| Required | Yes |

### integration

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"Qonto"` |

### action

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"CreateClient"` |

