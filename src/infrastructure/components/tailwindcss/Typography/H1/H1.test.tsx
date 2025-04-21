import { it, expect } from 'bun:test'
import { H1 } from './H1'
import { renderToString } from 'react-dom/server'

it('should match the H1 snapshot', async () => {
  // GIVEN
  const h1Component = <H1>Titre de test</H1>

  // WHEN
  const html = renderToString(h1Component)

  // THEN
  expect(html).toMatchSnapshot()
})
