import type { FormDto } from '@/application/dto/form.dto'
import { expect, test } from '@/e2e/fixtures'

test('should return a list of forms', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'form/index' })

  // WHEN
  const response = await page.request.get('/api/forms')

  // THEN
  expect(response.status()).toBe(200)
  const { forms }: { forms: FormDto[] } = await response.json()
  expect(forms.length).toBe(1)
  expect(forms[0]?.title).toBe('Contact us')
})

test('should return a form from a path', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'form/index',
  })

  // WHEN
  const response = await page.request.get('/api/form/contact-us')

  // THEN
  expect(response.status()).toBe(200)
  const { form }: { form: FormDto } = await response.json()
  expect(form.title).toBe('Contact us')
  expect(form.path).toBe('contact-us')
})
