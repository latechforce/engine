# Services

## Description

Defines configurations for various services

## Properties

| Name     | Type                                         | Required | Description                |
| -------- | -------------------------------------------- | -------- | -------------------------- |
| server   | Reference: [Server](/api/service/server)     |          |                            |
| database | Reference: [Database](/api/service/database) |          | The database of the engine |
| monitors | Array of [Monitor](/api/service/monitor)     |          | The monitors of the engine |
| loggers  | Array of [Logger](/api/service/logger)       |          | The loggers of the engine  |
| tunnel   | Reference: [Tunnel](/api/service/tunnel)     |          | The tunnel of the engine   |
| theme    | Reference: [Theme](/api/service/theme)       |          | The themes of the engine   |
