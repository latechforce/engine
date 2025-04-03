import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import { join } from 'path'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run a TypeScript code', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'hello-name',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'hello-name',
              input: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
                required: ['name'],
              },
              output: {
                message: '{{runJavascriptCode.message}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  name: '{{trigger.body.name}}',
                },
                code: String(async function (context: CodeRunnerContext<{ name: string }>) {
                  const { name } = context.inputData
                  return { message: `Hello ${name}!` }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/hello-name`, {
        name: 'Joe',
      })

      // THEN
      expect(response.message).toBe('Hello Joe!')
    })

    it('should run the example TypeScript code', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'hello-name',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'hello-name',
              input: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
                required: ['name'],
              },
              output: {
                message: '{{runJavascriptCode.message}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  name: '{{trigger.body.name}}',
                },
                code: String(async function (context: CodeRunnerContext<{ name: string }>) {
                  const { name } = context.inputData
                  return { message: `Hello ${name}!` }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await fetch(url + '/api/automation/hello-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'World' }),
      })
      const data = await response.json()

      // THEN
      expect(data.message).toBe('Hello World!')
    })

    it('should run a TypeScript code with a string input', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'hello-name',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'hello-name',
              input: {
                type: 'object',
                properties: {
                  text: { type: 'string' },
                },
                required: ['text'],
              },
              output: {
                message: '{{runJavascriptCode.message}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  text: '{{trigger.body.text}}',
                },
                code: String(async function (context: CodeRunnerContext<{ text: string }>) {
                  const { text } = context.inputData
                  return { message: text }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const text =
        '"RemittancePaybox";"Bank";"Site";"Rank";"ShopName";"IdPaybox";"Date";"TransactionId";"IdAppel";"DateOfIssue";"HourOfIssue";"DateOfExpiry";"Reference";"EmailCustomer";"Type";"Canal";"NumberOfAuthorization";"Amount";"Currency";"Entity";"Operator";"Country";"CountryIP";"CardType";"ThreeDSecureStatus";"ThreeDSecureEnrolled";"ThreeDSecureWarranted";"RefArchive";"0387513966";"004308";"5995444";"001";413564442;"2025-02-04";'

      // WHEN
      const response = await request.post(`${url}/api/automation/hello-name`, {
        text,
      })

      // THEN
      expect(response.message).toBe(text)
    })

    it('should run a Typescript code with env variable', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getEnv',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-env',
              output: {
                NODE_ENV: '{{runJavascriptCode.NODE_ENV}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                env: {
                  NODE_ENV: 'test',
                },
                code: String(async function (context: CodeRunnerContext) {
                  const { env } = context
                  const { NODE_ENV } = env
                  return { NODE_ENV }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-env`)

      // THEN
      expect(response.NODE_ENV).toBe('test')
    })

    it('should run a Typescript code with env variable and not showing them in logs', async () => {
      // GIVEN
      const filename = join(process.cwd(), 'tmp', `app-${nanoid()}.log`)
      fs.ensureFileSync(filename)
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getEnv',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-env',
              output: {
                NODE_ENV: '{{runJavascriptCode.NODE_ENV}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                env: {
                  NODE_ENV: 'xxx',
                },
                code: String(async function (context: CodeRunnerContext) {
                  const { env } = context
                  const { NODE_ENV } = env
                  return { success: !!NODE_ENV }
                }),
              },
            ],
          },
        ],
        loggers: [
          {
            driver: 'File',
            filename,
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/automation/get-env`)

      // THEN
      const content = await fs.readFile(filename, 'utf8')
      expect(content).not.toContain('xxx')
    })

    it('should run a Typescript code with the native Date class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getTimestamp',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-timestamp',
              output: {
                timestamp: {
                  number: '{{runJavascriptCode.timestamp}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const timestamp = Date.now()
                  return { timestamp }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-timestamp`)

      // THEN
      expect(response.timestamp).toBeGreaterThan(0)
    })

    it('should run a Typescript code with the native Array class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getIsArray',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'is-array',
              output: {
                isArray: {
                  boolean: '{{runJavascriptCode.isArray}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const isArray = Array.isArray([1, 2, 3])
                  return { isArray }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/is-array`)

      // THEN
      expect(response.isArray).toBeTruthy()
    })

    it('should run a Typescript code with the native Number class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getIsNumber',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'is-number',
              output: {
                isNumber: {
                  boolean: '{{runJavascriptCode.isNumber}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const isNumber = Number('1') == 1
                  return { isNumber }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/is-number`)

      // THEN
      expect(response.isNumber).toBeTruthy()
    })

    it('should run a Typescript code with the native Boolean class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getIsBoolean',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'is-boolean',
              output: {
                isBoolean: {
                  boolean: '{{runJavascriptCode.isBoolean}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const isBoolean = Boolean(1)
                  return { isBoolean }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/is-boolean`)

      // THEN
      expect(response.isBoolean).toBeTruthy()
    })

    it('should run a Typescript code with the native URLSearchParams class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getURLSearchParams',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-param',
              output: {
                param: '{{runJavascriptCode.param}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const param = new URLSearchParams('a=1').get('a')
                  return { param }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-param`)

      // THEN
      expect(response.param).toBe('1')
    })

    it('should run a Typescript code with the native TextEncoder class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getTextEncoder',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-text-encoder',
              output: {
                exist: '{{runJavascriptCode.exist}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const encoder = new TextEncoder()
                  return { exist: !!encoder }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-text-encoder`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the native TextDecoder class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getTextDecoder',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-text-decoder',
              output: {
                exist: '{{runJavascriptCode.exist}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const decoder = new TextDecoder()
                  return { exist: !!decoder }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-text-decoder`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the native Blob class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getBlob',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-blob',
              output: {
                exist: '{{runJavascriptCode.exist}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const blob = new Blob(['Hello, world!'])
                  return { exist: !!blob }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-blob`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the native ReadableStream class', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'getBlob',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'get-readable-stream',
              output: {
                exist: '{{runJavascriptCode.exist}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function () {
                  const stream = new ReadableStream()
                  return { exist: !!stream }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-readable-stream`)

      // THEN
      expect(response.exist).toBeTruthy()
    })
  })
})
