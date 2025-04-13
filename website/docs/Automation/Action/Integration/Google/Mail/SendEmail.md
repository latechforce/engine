# Send Email

Sends an email using Google Mail integration

## Properties

| Property    | Type   | Required | Const          | Description |
| ----------- | ------ | -------- | -------------- | ----------- |
| name        | string | Yes      |                |             |
| account     | string | Yes      |                |             |
| email       | object | Yes      |                |             |
| integration | string | Yes      | `"GoogleMail"` |             |
| action      | string | Yes      | `"SendEmail"`  |             |

## Examples

Example 1:

```json
{
  "integration": "GoogleMail",
  "action": "SendEmail",
  "email": {
    "to": "recipient@example.com",
    "subject": "Test Email",
    "text": "This is a test email"
  }
}
```
