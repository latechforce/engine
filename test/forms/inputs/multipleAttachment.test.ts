import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import type { RecordFieldAttachment } from '/domain/entities/Record'
import { configFormInputMultipleAttachment } from '/examples/config/form/input/multipleAttachment'

const mock = new Mock(Tester, { drivers: ['Database', 'Storage'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    it('should display the multiple attachments input', async () => {
      // GIVEN
      const { url } = await app.start(configFormInputMultipleAttachment)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Multiple Attachment')
    })

    it('should create a record with a multiple attachment input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(configFormInputMultipleAttachment.tables![0])
      const { url } = await app.start(configFormInputMultipleAttachment)

      // Create two test files
      const filePath1 = './tmp/test1.txt'
      const filePath2 = './tmp/test2.csv'
      await Bun.write(filePath1, 'Hello, world!')
      await Bun.write(filePath2, 'Hello, world 2!')

      // WHEN
      await page.goto(`${url}/form/path`)
      const fileInput = await page.waitForSelector('input[type="file"]')
      await fileInput?.uploadFile(filePath1, filePath2)
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list<{
        multiple_attachment: RecordFieldAttachment[]
      }>()
      expect(records).toHaveLength(1)
      expect(records[0].fields.multiple_attachment).toHaveLength(2)
      expect(records[0].fields.multiple_attachment?.[0].name).toBe('test1.txt')
      expect(records[0].fields.multiple_attachment?.[0].mime_type).toBe('text/plain')
      expect(records[0].fields.multiple_attachment?.[0].url).toStartWith(url)
      expect(records[0].fields.multiple_attachment?.[1].name).toBe('test2.csv')
      expect(records[0].fields.multiple_attachment?.[1].mime_type).toBe('text/csv')
      expect(records[0].fields.multiple_attachment?.[1].url).toStartWith(url)
    })
  })
})
