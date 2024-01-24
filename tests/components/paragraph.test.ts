import { test, expect } from '@playwright/test'
import { createPage, type IPage } from '@solumy/engine/page'

test.describe('Paragraph component', () => {
  test('should render a paragraph', async () => {
    // GIVEN
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.'
    const config: IPage = {
      name: 'Page',
      path: '/',
      body: [
        {
          component: 'Paragraph',
          text,
        },
      ],
    }

    // WHEN
    const { page, errors } = createPage(config)
    const html = page?.renderHtml()

    // THEN
    expect(errors).toHaveLength(0)
    expect(html).toContain(text)
    expect(html).toContain('<p')
  })
})
