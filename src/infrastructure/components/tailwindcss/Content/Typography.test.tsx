import { it, expect } from 'bun:test'
import { Typography } from './Typography'
import { renderToString } from 'react-dom/server'

it('should match the Typography snapshot', async () => {
  // GIVEN
  const h1Component = <Typography variant="h1">Titre de test</Typography>

  // WHEN
  const html = renderToString(h1Component)

  // THEN
  expect(html).toMatchSnapshot()
})
