import { describe, it, expect } from 'bun:test'
import { Form } from './Form'
import { renderToString } from 'react-dom/server'

describe('Form', () => {
  it('should match the form snapshot', async () => {
    // GIVEN
    const form = <Form id="form" title="Form" action="/form/user" />

    // WHEN
    const html = renderToString(form)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the form snapshot with description', async () => {
    // GIVEN
    const form = <Form id="form" title="Form" description="Form description" action="/form/user" />

    // WHEN
    const html = renderToString(form)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the form snapshot with submit label', async () => {
    // GIVEN
    const form = <Form id="form" title="Form" submitLabel="Save" action="/form/user" />

    // WHEN
    const html = renderToString(form)

    // THEN
    expect(html).toMatchSnapshot()
  })
})
