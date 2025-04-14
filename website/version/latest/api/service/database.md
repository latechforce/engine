# Database

## Description

The database config for the engine

## Default

```json
{
  "driver": "SQLite",
  "url": ":memory:"
}
```

## Properties

| Name   | Type                         | Required | Description |
| ------ | ---------------------------- | -------- | ----------- |
| driver | enum: `PostgreSQL`, `SQLite` | ✔       |             |
| url    | string                       | ✔       |             |
