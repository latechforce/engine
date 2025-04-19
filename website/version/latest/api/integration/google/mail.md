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

### account

>account: `string`

### password

>password: `string`

### user

>user: `string`

## Optional

### baseUrl

>baseUrl?: `string`

