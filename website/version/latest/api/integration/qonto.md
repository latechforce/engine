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

### account

>account: `string`

### organisationSlug

>organisationSlug: `string`

### secretKey

>secretKey: `string`

## Optional

### baseUrl

>baseUrl?: `string`

### stagingToken

>stagingToken?: `string`

