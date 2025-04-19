import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionServiceCodeRunTypescriptWithDateFns } from '/examples/config/automation/action/service/code/runTypescript/withPackage/dateFns'
import { configAutomationActionServiceCodeRunTypescriptWithDateFnsLocale } from '/examples/config/automation/action/service/code/runTypescript/withPackage/dateFnsLocale'
import { configAutomationActionServiceCodeRunTypescriptWithDateFnsTz } from '/examples/config/automation/action/service/code/runTypescript/withPackage/dateFnsTz'
import { configAutomationActionServiceCodeRunTypescriptWithXml2js } from '/examples/config/automation/action/service/code/runTypescript/withPackage/xml2js'
import { configAutomationActionServiceCodeRunTypescriptWithAxios } from '/examples/config/automation/action/service/code/runTypescript/withPackage/axios'
import { configAutomationActionServiceCodeRunTypescriptWithHttps } from '/examples/config/automation/action/service/code/runTypescript/withPackage/https'
import { configAutomationActionServiceCodeRunTypescriptWithFsExtra } from '/examples/config/automation/action/service/code/runTypescript/withPackage/fsExtra'
import { configAutomationActionServiceCodeRunTypescriptWithSlugify } from '/examples/config/automation/action/service/code/runTypescript/withPackage/slugify'
import { configAutomationActionServiceCodeRunTypescriptWithSodium } from '/examples/config/automation/action/service/code/runTypescript/withPackage/sodium'
import { configAutomationActionServiceCodeRunTypescriptWithNotion } from '/examples/config/automation/action/service/code/runTypescript/withPackage/notion'
import { configAutomationActionServiceCodeRunTypescriptWithAirtable } from '/examples/config/automation/action/service/code/runTypescript/withPackage/airtable'
import { configAutomationActionServiceCodeRunTypescriptWithPapaparse } from '/examples/config/automation/action/service/code/runTypescript/withPackage/papaparse'
import { configAutomationActionServiceCodeRunTypescriptWithPuppeteer } from '/examples/config/automation/action/service/code/runTypescript/withPackage/puppeteer'
import { configAutomationActionServiceCodeRunTypescriptWithMistral } from '/examples/config/automation/action/service/code/runTypescript/withPackage/mistral'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run a Typescript code with the date-fns package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithDateFns)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-date`)

      // THEN
      expect(response.date).toBe('2024-09-01')
    })

    it('should run a Typescript code with the date-fns/locale package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithDateFnsLocale
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-date-locale`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the date-fns-tz package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithDateFnsTz)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-date-tz`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with xml2js package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithXml2js)

      // WHEN
      const response = await request.post(`${url}/api/automation/parse-xml`)

      // THEN
      expect(response.result).toStrictEqual({
        key: 'value',
        root: { item: ['Value1', 'Value2'] },
      })
    })

    it('should run a Typescript code with axios package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithAxios)

      // WHEN
      const response = await request.post(`${url}/api/automation/axios`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with https package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithHttps)

      // WHEN
      const response = await request.post(`${url}/api/automation/https`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with fs-extra package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithFsExtra)

      // WHEN
      const response = await request.post(`${url}/api/automation/fsExtra`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with slugify package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithSlugify)

      // WHEN
      const response = await request.post(`${url}/api/automation/slugify`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with sodium package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithSodium)

      // WHEN
      const response = await request.post(`${url}/api/automation/sodium`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with Notion package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithNotion)

      // WHEN
      const response = await request.post(`${url}/api/automation/notion`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with Airtable package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithAirtable)

      // WHEN
      const response = await request.post(`${url}/api/automation/airtable`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with papaparse package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithPapaparse)

      // WHEN
      const response = await request.post(`${url}/api/automation/papaparse`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with puppeteer package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithPuppeteer)

      // WHEN
      const response = await request.post(`${url}/api/automation/puppeteer`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with MistralAI package', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunTypescriptWithMistral)

      // WHEN
      const response = await request.post(`${url}/api/automation/mistral`)

      // THEN
      expect(response.exist).toBeTruthy()
    })
  })
})
