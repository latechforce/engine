import { describe, it, expect } from 'bun:test'
import { Input } from './Input'
import { renderToString } from 'react-dom/server'

describe('Input', () => {
  it('should match the form snapshot', async () => {
    // GIVEN
    const input = <Input field="name" type="text" />

    // WHEN
    const html = renderToString(input)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the input snapshot with label', async () => {
    // GIVEN
    const input = <Input field="name" type="text" label="Name" />

    // WHEN
    const html = renderToString(input)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the input snapshot with description', async () => {
    // GIVEN
    const input = <Input field="name" type="text" description="Description" />

    // WHEN
    const html = renderToString(input)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the input snapshot with label and description', async () => {
    // GIVEN
    const input = <Input field="name" type="text" label="Name" description="Description" />

    // WHEN
    const html = renderToString(input)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the input snapshot with placeholder', async () => {
    // GIVEN
    const input = <Input field="name" type="text" placeholder="Placeholder" />

    // WHEN
    const html = renderToString(input)

    // THEN
    expect(html).toMatchSnapshot()
  })

  it('should match the input snapshot with required', async () => {
    // GIVEN
    const input = <Input field="name" type="text" required />

    // WHEN
    const html = renderToString(input)

    // THEN
    expect(html).toMatchSnapshot()
  })
})
