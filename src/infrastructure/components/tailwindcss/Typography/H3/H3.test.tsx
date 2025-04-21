import { it, expect } from 'bun:test'
import { H3 } from './H3'
import { renderToString } from 'react-dom/server'

it('should match the H1 snapshot', async () => {
  // GIVEN
  const h3Component = <H3>Titre de test</H3>

  // WHEN
  const html = renderToString(h3Component)

  // THEN
  expect(html).toMatchSnapshot()
})
