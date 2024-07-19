import { test, expect } from '@tests/fixtures'
import App, { type App as Config } from '@safidea/engine'

test.describe('Input component', () => {
  test('should render a textarea input', async ({ page }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      pages: [
        {
          name: 'Page',
          path: '/',
          body: [
            {
              component: 'Container',
              children: [
                {
                  component: 'Input',
                  type: 'textarea',
                  name: 'description',
                },
              ],
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    await page.goto(url)

    // THEN
    const input = page.getByRole('textbox')
    await expect(input).toBeVisible()
    const isTextarea = await input.evaluate((node) => node.tagName.toLowerCase() === 'textarea')
    expect(isTextarea).toBeTruthy()
  })

  test('should display a input in app page', async ({ page }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      pages: [
        {
          name: 'Page',
          path: '/',
          body: [
            {
              component: 'Input',
              name: 'name',
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    await page.goto(url)

    // THEN
    const input = page.getByRole('textbox')
    await expect(input).toBeVisible()
  })

  test('should display the input id', async ({ page }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      pages: [
        {
          name: 'Page',
          path: '/',
          body: [
            {
              component: 'Input',
              name: 'name',
              id: 'my-input',
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    await page.goto(url)

    // THEN
    const input = page.getByRole('textbox')
    await expect(input).toHaveAttribute('id')
    expect(await input.getAttribute('id')).toBe('my-input')
  })
})
