import { describe, it, expect } from 'bun:test'
import { FormResponse } from './FormResponse'
import { renderToString } from 'react-dom/server'

describe('FormResponse', () => {
  it('should match the form response snapshot', async () => {
    // GIVEN
    const formResponse = <FormResponse id="form-response" message="Form Response" />

    // WHEN
    const html = renderToString(formResponse)

    // THEN
    expect(html).toMatchSnapshot()
  })
})
