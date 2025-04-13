# Multiple linked record

Represents a field that can link to multiple records from another table

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

### required

| Property | Value |
|----------|-------|
| Type | boolean |
| Required | No |

### onMigration

| Property | Value |
|----------|-------|
| Type | object |
| Required | No |

### type

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"MultipleLinkedRecord"` |

### table

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |

