import type { FormDto } from '@/application/dto/forms.dto'
import { expect, test } from '@/e2e/fixtures'

test('should return a list of forms', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'form/input/single-line-text' })

  // WHEN
  const response = await page.request.get('/api/forms')

  // THEN
  expect(response.status()).toBe(200)
  const forms: FormDto[] = await response.json()
  expect(forms.length).toBe(1)
  expect(forms[0]?.title).toBe('Contact us')
})
