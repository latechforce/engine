import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import { join } from 'path'
import { configAutomationActionServiceCodeRunTypescript } from '/examples/config/automation/action/service/code/runTypescript'
import { configAutomationActionServiceCodeRunTypescriptInput } from '/examples/config/automation/action/service/code/runTypescript/input'
import { configAutomationActionServiceCodeRunTypescriptEnv } from '/examples/config/automation/action/service/code/runTypescript/env'
import { configAutomationActionServiceCodeRunTypescriptWithDateClass } from '/examples/config/automation/action/service/code/runTypescript/withDateClass'
import { configAutomationActionServiceCodeRunTypescriptWithArrayClass } from '/examples/config/automation/action/service/code/runTypescript/withArrayClass'
import { configAutomationActionServiceCodeRunTypescriptWithNumberClass } from '/examples/config/automation/action/service/code/runTypescript/withNumberClass'
import { configAutomationActionServiceCodeRunTypescriptWithBooleanClass } from '/examples/config/automation/action/service/code/runTypescript/withBooleanClass'
import { configAutomationActionServiceCodeRunTypescriptWithURLSearchParamsClass } from '/examples/config/automation/action/service/code/runTypescript/withURLSearchParamsClass'
import { configAutomationActionServiceCodeRunTypescriptWithTextEncoderClass } from '/examples/config/automation/action/service/code/runTypescript/withTextEncoderClass'
import { configAutomationActionServiceCodeRunTypescriptWithTextDecoderClass } from '/examples/config/automation/action/service/code/runTypescript/withTextDecoderClass'
import { configAutomationActionServiceCodeRunTypescriptWithBlobClass } from '/examples/config/automation/action/service/code/runTypescript/withBlobClass'
import { configAutomationActionServiceCodeRunTypescriptWithReadableStreamClass } from '/examples/config/automation/action/service/code/runTypescript/withReadableStreamClass'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run a TypeScript code', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescript)

      // WHEN
      const response = await request.post(`${url}/api/automation/run-typescript`)

      // THEN
      expect(response.message).toBe('Hello, world!')
    })

    it('should run a TypeScript code with a string input', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptInput)
      const text =
        '"RemittancePaybox";"Bank";"Site";"Rank";"ShopName";"IdPaybox";"Date";"TransactionId";"IdAppel";"DateOfIssue";"HourOfIssue";"DateOfExpiry";"Reference";"EmailCustomer";"Type";"Canal";"NumberOfAuthorization";"Amount";"Currency";"Entity";"Operator";"Country";"CountryIP";"CardType";"ThreeDSecureStatus";"ThreeDSecureEnrolled";"ThreeDSecureWarranted";"RefArchive";"0387513966";"004308";"5995444";"001";413564442;"2025-02-04";'

      // WHEN
      const response = await request.post(`${url}/api/automation/run-typescript-with-input`, {
        text,
      })

      // THEN
      expect(response.message).toBe(text)
    })

    it('should run a Typescript code with env variable', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptEnv)

      // WHEN
      const response = await request.post(`${url}/api/automation/run-typescript-with-env`)

      // THEN
      expect(response.nodeEnv).toBe('xxx')
    })

    it('should run a Typescript code with env variable and not showing them in logs', async () => {
      // GIVEN
      const filename = join(process.cwd(), 'tmp', `app-${nanoid()}.log`)
      fs.ensureFileSync(filename)
      const config: Config = {
        ...configAutomationActionServiceCodeRunTypescriptEnv,
        services: {
          loggers: [
            {
              driver: 'File',
              filename,
            },
          ],
        },
      }
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/automation/run-typescript-with-env`)

      // THEN
      const content = await fs.readFile(filename, 'utf8')
      expect(content).not.toContain('xxx')
    })

    it('should run a Typescript code with the native Date class', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithDateClass)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-timestamp`)

      // THEN
      expect(response.timestamp).toBeGreaterThan(0)
    })

    it('should run a Typescript code with the native Array class', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithArrayClass)

      // WHEN
      const response = await request.post(`${url}/api/automation/is-array`)

      // THEN
      expect(response.isArray).toBeTruthy()
    })

    it('should run a Typescript code with the native Number class', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithNumberClass)

      // WHEN
      const response = await request.post(`${url}/api/automation/is-number`)

      // THEN
      expect(response.isNumber).toBeTruthy()
    })

    it('should run a Typescript code with the native Boolean class', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithBooleanClass
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/is-boolean`)

      // THEN
      expect(response.isBoolean).toBeTruthy()
    })

    it('should run a Typescript code with the native URLSearchParams class', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithURLSearchParamsClass
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-param`)

      // THEN
      expect(response.param).toBe('1')
    })

    it('should run a Typescript code with the native TextEncoder class', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithTextEncoderClass
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-text-encoder`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the native TextDecoder class', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithTextDecoderClass
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-text-decoder`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the native Blob class', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithBlobClass)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-blob`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the native ReadableStream class', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithReadableStreamClass
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-readable-stream`)

      // THEN
      expect(response.exist).toBeTruthy()
    })
  })
})
