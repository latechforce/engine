import { describe, it, expect } from 'bun:test'
import { Form, FormResponse } from './Form'
import { renderToString } from 'react-dom/server'

describe('Form', () => {
  it('should match the form snapshot', async () => {
    // GIVEN
    const form = <Form id="form" title="Form" />

    // WHEN
    const html = renderToString(form)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the form snapshot with description', async () => {
    // GIVEN
    const form = <Form id="form" title="Form" description="Form description" />

    // WHEN
    const html = renderToString(form)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the form snapshot with submit label', async () => {
    // GIVEN
    const form = <Form id="form" title="Form" submitLabel="Save" />

    // WHEN
    const html = renderToString(form)

    // THEN
    expect(html).toMatchSnapshot()
  })
})

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
