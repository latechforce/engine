# List Payments

Lists payments using GoCardless integration with optional filters

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

### params

| Property | Value |
|----------|-------|
| Type | object |
| Required | Yes |

### integration

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"GoCardless"` |

### action

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"ListPayments"` |

