import { expect, test } from '@/e2e/fixtures'

test('should display a form with a title', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible()
})

test('should display a form with a description', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByText('Please fill in the form below to contact us.')).toBeVisible()
})

test('should display a form with inputs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByLabel('Name')).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Phone')).toBeVisible()
  await expect(page.getByLabel('Message')).toBeVisible()
  await expect(page.getByPlaceholder('Enter your message')).toBeVisible()
})

test('should display a form with inputs placeholders', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByPlaceholder('Enter your name')).toBeVisible()
  await expect(page.getByPlaceholder('Enter your email')).toBeVisible()
  await expect(page.getByPlaceholder('Enter your phone number')).toBeVisible()
  await expect(page.getByPlaceholder('Enter your message')).toBeVisible()
})

test('should display a form with inputs descriptions', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByText('Please enter your name')).toBeVisible()
  await expect(page.getByText('Please enter your email')).toBeVisible()
  await expect(page.getByText('Please enter your phone number')).toBeVisible()
  await expect(page.getByText('Please enter your message')).toBeVisible()
})

test('should display a form with submit button', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
})
