import { test, expect } from '@tests/fixtures'
import App, { type Config } from '@latechforce/engine'

test.describe('Dropdown component', () => {
  test('should display the dropdown with id', async ({ page }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      pages: [
        {
          name: 'Page',
          path: '/',
          body: [
            {
              component: 'Dropdown',
              label: 'hello world',
              id: 'my-dropdown',
              links: [
                {
                  label: 'link 1',
                  href: '/about',
                },
                {
                  label: 'link 2',
                  href: '/about',
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
    const menu = page.locator('#my-dropdown')
    await expect(menu).toBeVisible()
    expect(await page.screenshot()).toMatchSnapshot()
  })
})
