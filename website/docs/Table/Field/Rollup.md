# Rollup

Represents a field that aggregates data from linked records

## Schema Overview

| Property | Value |
|----------|-------|
| Type | `object` |

## Properties

### multipleLinkedRecord

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |

### type

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |
| Const | `"Rollup"` |

### formula

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |

### linkedRecordField

| Property | Value |
|----------|-------|
| Type | string |
| Required | Yes |

### output

| Property | Value |
|----------|-------|
| Type | object |
| Required | Yes |

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

