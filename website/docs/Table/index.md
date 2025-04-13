# Table

Defines the structure of a database table

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
| Description | The unique identifier for the table |

#### Examples

Example 1:

```json
"users"
```

### schema

| Property | Value |
|----------|-------|
| Type | string |
| Required | No |
| Description | The database schema where the table is located |

#### Examples

Example 1:

```json
"public"
```

### fields

| Property | Value |
|----------|-------|
| Type | array |
| Required | Yes |
| Description | Array of field definitions for the table |

#### Examples

Example 1:

```json
[
  {
    "name": "id",
    "type": "string",
    "required": true
  }
]
```

