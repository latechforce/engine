# Retrieve Attachment

Retrieves an attachment using Qonto integration

## Properties

| Property     | Type   | Required | Const                  | Description |
| ------------ | ------ | -------- | ---------------------- | ----------- |
| name         | string | Yes      |                        |             |
| account      | string | Yes      |                        |             |
| attachmentId | string | Yes      |                        |             |
| integration  | string | Yes      | `"Qonto"`              |             |
| action       | string | Yes      | `"RetrieveAttachment"` |             |

## Examples

Example 1:

```json
{
  "integration": "Qonto",
  "action": "RetrieveAttachment",
  "attachmentId": "att_123456789"
}
```
