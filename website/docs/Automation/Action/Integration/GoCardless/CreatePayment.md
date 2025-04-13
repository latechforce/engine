# Create Payment

Creates a new payment in GoCardless with the specified details

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

### payment

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
| Const | `"CreatePayment"` |

