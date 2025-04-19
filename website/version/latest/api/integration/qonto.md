# Qonto

A configuration schema for Qonto banking integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Qonto integration",
  "integrations": {
    "qonto": [
      {
        "account": "qonto_account",
        "organisationSlug": "qonto_organisation_slug",
        "secretKey": "qonto_secret_key"
      }
    ]
  }
}

await new App().start(config)
```
## Required

### Account

The account identifier for the Qonto integration
>account: `string`

### Organisation Slug

The unique identifier for your Qonto organisation
>organisationSlug: `string`

### Secret Key

The API secret key used to authenticate with Qonto
>secretKey: `string`

## Optional

### Staging Token

Optional token used for testing with Qonto staging environment
>stagingToken?: `string`

### Base URL

Optional custom base URL for Qonto API endpoints
>baseUrl?: `string`

