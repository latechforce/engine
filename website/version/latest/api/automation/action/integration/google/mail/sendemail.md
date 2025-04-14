# Send Email

## Description

Sends an email using Google Mail integration

## Properties

| Name        | Type                | Required | Description |
| ----------- | ------------------- | -------- | ----------- |
| name        | string              | ✔       |             |
| account     | string              | ✔       |             |
| email       | Object              | ✔       |             |
| integration | const: `GoogleMail` | ✔       |             |
| action      | const: `SendEmail`  | ✔       |             |

## Property Details

### email

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| from     | string |          |             |
| to       | string | ✔       |             |
| cc       | string |          |             |
| bcc      | string |          |             |
| subject  | string |          |             |
| text     | string |          |             |
| html     | string |          |             |

## Example

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
