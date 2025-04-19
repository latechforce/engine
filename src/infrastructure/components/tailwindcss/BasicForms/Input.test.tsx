import { it, expect } from 'bun:test'
import { Input } from './Input'
import { renderToString } from 'react-dom/server'

it('should match the text input snapshot', async () => {
  // GIVEN
  const input = <Input field="name" type="text" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the email input snapshot', async () => {
  // GIVEN
  const input = <Input field="name" type="email" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with label', async () => {
  // GIVEN
  const input = <Input field="name" label="Name" type="text" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with description', async () => {
  // GIVEN
  const input = <Input field="name" description="Description" type="text" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with label and description', async () => {
  // GIVEN
  const input = <Input field="name" label="Name" description="Description" type="text" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the input snapshot with placeholder', async () => {
  // GIVEN
  const input = <Input field="name" placeholder="Placeholder" type="text" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with required', async () => {
  // GIVEN
  const input = <Input field="name" required type="text" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
