import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import type { RecordFieldAttachment } from '/domain/entities/Record'

const mock = new Mock(Tester, { drivers: ['Database', 'Storage'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      engine: '1.0.0',
      forms: [
        {
          name: 'form',
          path: 'path',
          table: 'table',
          inputs: [
            {
              field: 'single_attachment',
              label: 'Single Attachment',
            },
          ],
        },
      ],
      tables: [
        {
          name: 'table',
          fields: [
            {
              name: 'single_attachment',
              type: 'SingleAttachment',
            },
          ],
        },
      ],
    }

    it('should display the single attachment input', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Single Attachment')
    })

    it('should create a record with a single attachment input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(config.tables![0])
      const { url } = await app.start(config)

      // Create two test files
      const filePath = './tmp/test3.txt'
      await Bun.write(filePath, 'Hello, world!')

      // WHEN
      await page.goto(`${url}/form/path`)
      const fileInput = await page.waitForSelector('input[type="file"]')
      await fileInput?.uploadFile(filePath)
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list<{
        single_attachment: RecordFieldAttachment
      }>()
      expect(records).toHaveLength(1)
      expect(records[0].fields.single_attachment?.name).toBe('test3.txt')
      expect(records[0].fields.single_attachment?.mime_type).toBe('text/plain')
      expect(records[0].fields.single_attachment?.url).toStartWith(url)
    })

    it('should be able to download a submitted single attachment', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(config.tables![0])
      const { url } = await app.start(config)

      // Create two test files
      const filePath = './tmp/test3.txt'
      await Bun.write(filePath, 'Hello, world!')

      // WHEN
      await page.goto(`${url}/form/path`)
      const fileInput = await page.waitForSelector('input[type="file"]')
      await fileInput?.uploadFile(filePath)
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list<{
        single_attachment: RecordFieldAttachment
      }>()
      const response = await fetch(records[0].fields.single_attachment?.url)
      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe('text/plain')
      expect(await response.text()).toBe('Hello, world!')
    })
  })
})
