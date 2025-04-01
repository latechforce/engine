import { it, expect } from 'bun:test'
import { EmailInput } from './EmailInput'
import { renderToString } from 'react-dom/server'

it('should match the email input snapshot', async () => {
  // GIVEN
  const input = <EmailInput field="email" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the email input snapshot with label', async () => {
  // GIVEN
  const input = <EmailInput field="email" label="Email" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the email input snapshot with description', async () => {
  // GIVEN
  const input = <EmailInput field="email" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with label and description', async () => {
  // GIVEN
  const input = <EmailInput field="email" label="Email" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the email input snapshot with placeholder', async () => {
  // GIVEN
  const input = <EmailInput field="email" placeholder="Placeholder" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the email input snapshot with required', async () => {
  // GIVEN
  const input = <EmailInput field="email" required />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
