import { expect, test } from '@/e2e/fixtures'

test('should return a page with title', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  await expect(page).toHaveTitle('Head')
})

test('should return a page with description meta tag', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'Head')
})

test('should include Tailwind CSS script from CDN', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  await expect(
    page.locator('script[src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"]')
  ).toHaveCount(1)
  await expect(
    page.locator('script[src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"]')
  ).toHaveAttribute('src', 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4')
})

test('should include inline Tailwind theme styles', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  const styleElement = page.locator('style[type="text/tailwindcss"]')
  await expect(styleElement).toHaveCount(1)
  await expect(styleElement).toHaveAttribute('type', 'text/tailwindcss')

  // Check style content using innerHTML since textContent is not accessible for style elements
  const styleContent = await styleElement.innerHTML()
  expect(styleContent).toContain('@theme')
  expect(styleContent).toContain('--color-clifford: #da373d')
})

test('should include external stylesheet link', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  await expect(page.locator('link[href="/index.css"][rel="stylesheet"]')).toHaveCount(1)
  await expect(page.locator('link[href="/index.css"][rel="stylesheet"]')).toHaveAttribute(
    'href',
    '/index.css'
  )
  await expect(page.locator('link[href="/index.css"][rel="stylesheet"]')).toHaveAttribute(
    'rel',
    'stylesheet'
  )
})

test('should have proper HTML structure with all head elements', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  // Verify basic HTML structure
  await expect(page.locator('html')).toHaveCount(1)
  await expect(page.locator('head')).toHaveCount(1)
  await expect(page.locator('body')).toHaveCount(1)

  // Verify all head elements are present
  const headElements = page.locator('head > *')

  // Should have at least 7 elements (charset, viewport, title, meta, script, style, link)
  const headElementCount = await headElements.count()
  expect(headElementCount).toBeGreaterThanOrEqual(7)

  // Verify specific elements exist
  const titleContent = await page.locator('head title').innerHTML()
  expect(titleContent).toBe('Head')
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', 'Head')
  await expect(page.locator('head script[src*="tailwindcss"]')).toHaveCount(1)
  await expect(page.locator('head style[type="text/tailwindcss"]')).toHaveCount(1)
  await expect(page.locator('head link[rel="stylesheet"]')).toHaveCount(1)
})

test('should render empty body correctly', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  // The body should be empty (no content elements) but still exist
  await expect(page.locator('body')).toBeEmpty()

  // Verify the page loads successfully despite empty body
  await expect(page).toHaveURL('/head')
})

test('should load page successfully and take screenshot', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/head')

  // THEN
  await expect(page).toHaveURL('/head')
  await expect(page).toHaveScreenshot()
})
