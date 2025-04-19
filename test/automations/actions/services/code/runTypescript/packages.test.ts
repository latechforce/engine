import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionServiceCodeRunTypescriptWithDateFnsPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/dateFns'
import { configAutomationActionServiceCodeRunTypescriptWithDateFnsLocalePackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/dateFnsLocale'
import { configAutomationActionServiceCodeRunTypescriptWithDateFnsTzPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/dateFnsTz'
import { configAutomationActionServiceCodeRunTypescriptWithXml2jsPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/xml2js'
import { configAutomationActionServiceCodeRunTypescriptWithAxiosPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/axios'
import { configAutomationActionServiceCodeRunTypescriptWithHttpsPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/https'
import { configAutomationActionServiceCodeRunTypescriptWithFsExtraPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/fsExtra'
import { configAutomationActionServiceCodeRunTypescriptWithSlugifyPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/slugify'
import { configAutomationActionServiceCodeRunTypescriptWithSodiumPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/sodium'
import { configAutomationActionServiceCodeRunTypescriptWithNotionPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/notion'
import { configAutomationActionServiceCodeRunTypescriptWithAirtablePackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/airtable'
import { configAutomationActionServiceCodeRunTypescriptWithPapaparsePackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/papaparse'
import { configAutomationActionServiceCodeRunTypescriptWithPuppeteerPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/puppeteer'
import { configAutomationActionServiceCodeRunTypescriptWithMistralPackage } from '/examples/config/automation/action/service/code/runTypescript/withPackage/mistral'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run a Typescript code with the date-fns package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithDateFnsPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-date`)

      // THEN
      expect(response.date).toBe('2024-09-01')
    })

    it('should run a Typescript code with the date-fns/locale package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithDateFnsLocalePackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-date-locale`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with the date-fns-tz package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithDateFnsTzPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/get-date-tz`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with xml2js package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithXml2jsPackage
      )

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
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAxiosPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/axios`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with https package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithHttpsPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/https`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with fs-extra package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithFsExtraPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/fsExtra`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with slugify package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithSlugifyPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/slugify`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with sodium package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithSodiumPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/sodium`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with Notion package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/notion`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with Airtable package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAirtablePackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/airtable`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with papaparse package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithPapaparsePackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/papaparse`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with puppeteer package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithPuppeteerPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/puppeteer`)

      // THEN
      expect(response.exist).toBeTruthy()
    })

    it('should run a Typescript code with MistralAI package', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithMistralPackage
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/mistral`)

      // THEN
      expect(response.exist).toBeTruthy()
    })
  })
})
