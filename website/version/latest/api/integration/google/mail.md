# Mail

A configuration schema for Gmail integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Google Mail integration",
  "integrations": {
    "google": {
      "mail": [
        {
          "account": "google_mail_account",
          "user": "google_mail_user_email",
          "password": "google_mail_user_password"
        }
      ]
    }
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for the Google Mail integration
>account: `string`

### User

The user email address for Gmail authentication
>user: `string`

### Password

The password or app password for Gmail authentication
>password: `string`

## Optional

### Base URL

The base URL for Gmail authentication
>baseUrl?: `string`

