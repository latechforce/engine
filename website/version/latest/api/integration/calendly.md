# Calendly

A configuration schema for Calendly scheduling integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Calendly integration",
  "integrations": {
    "calendly": [
      {
        "account": "calendly_account",
        "accessToken": "{{ env.TEST_CALENDLY_ACCESS_TOKEN }}",
        "clientId": "{{ env.TEST_CALENDLY_CLIENT_ID }}",
        "clientSecret": "{{ env.TEST_CALENDLY_CLIENT_SECRET }}"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for Calendly
>account: `string`

### Access Token

The access token for Calendly API authentication
>accessToken: `string`

### Client ID

The client ID for Calendly API authentication
>clientId: `string`

### Client Secret

The client secret for Calendly API authentication
>clientSecret: `string`

## Optional

### Base URL

The base URL for Calendly API
>baseUrl?: `string`

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Calendly integration with baseUrl",
  "integrations": {
    "calendly": [
      {
        "account": "calendly_account",
        "accessToken": "{{ env.TEST_CALENDLY_ACCESS_TOKEN }}",
        "clientId": "{{ env.TEST_CALENDLY_CLIENT_ID }}",
        "clientSecret": "{{ env.TEST_CALENDLY_CLIENT_SECRET }}",
        "baseUrl": "{{ env.TEST_CALENDLY_BASE_URL }}"
      }
    ]
  }
}

await new App().start(config)
```
### Base URL

The base URL for Calendly API authentication
>authBaseUrl?: `string`

