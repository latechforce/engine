# Get Company

Retrieves company information using Pappers integration

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with Pappers integration with GetCompany action",
  "automations": [
    {
      "name": "getCompany",
      "trigger": {
        "service": "Http",
        "event": "ApiCalled",
        "path": "get-company",
        "output": {
          "denomination": "{{getCompany.denomination}}"
        }
      },
      "actions": [
        {
          "name": "getCompany",
          "integration": "Pappers",
          "action": "GetCompany",
          "account": "pappers",
          "siret": "44306184100047"
        }
      ]
    }
  ]
}

await new App().start(config)
```
## Required

### account

>account: `string`

### action

>action: const: `GetCompany`

### integration

>integration: const: `Pappers`

### name

>name: `string`

### siret

>siret: `string`

