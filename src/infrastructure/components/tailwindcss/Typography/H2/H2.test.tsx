import { it, expect } from 'bun:test'
import { H2 } from './H2'
import { renderToString } from 'react-dom/server'

it('should match the H1 snapshot', async () => {
  // GIVEN
  const h2Component = <H2>Titre de test</H2>

  // WHEN
  const html = renderToString(h2Component)

  // THEN
  expect(html).toMatchSnapshot()
})
