# Retrieve Attachment

## Description

Retrieves an attachment using Qonto integration

## Properties

| Name         | Type                        | Required | Description |
| ------------ | --------------------------- | -------- | ----------- |
| name         | string                      | ✔       |             |
| account      | string                      | ✔       |             |
| attachmentId | string                      | ✔       |             |
| integration  | const: `Qonto`              | ✔       |             |
| action       | const: `RetrieveAttachment` | ✔       |             |

## Example

```json
{
  "integration": "Qonto",
  "action": "RetrieveAttachment",
  "attachmentId": "att_123456789"
}
```
