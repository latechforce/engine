---
sidebar_position: 5
---

# Bucket

Defines a storage bucket for file management

```ts
import App, { type Config } from '@latechforce/engine/bun'

const config: Config = {
  "name": "App with buckets",
  "buckets": [
    {
      "name": "bucket_1"
    },
    {
      "name": "bucket_2"
    }
  ]
}

await new App().start(config)
```
## Required

### Name

The name of the bucket.
>name: `string`

