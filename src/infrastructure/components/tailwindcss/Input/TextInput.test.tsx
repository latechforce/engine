import { it, expect } from 'bun:test'
import { TextInput } from './TextInput'
import { renderToString } from 'react-dom/server'

it('should match the text input snapshot', async () => {
  // GIVEN
  const input = <TextInput field="name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with label', async () => {
  // GIVEN
  const input = <TextInput field="name" label="Name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with description', async () => {
  // GIVEN
  const input = <TextInput field="name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with label and description', async () => {
  // GIVEN
  const input = <TextInput field="name" label="Name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the input snapshot with placeholder', async () => {
  // GIVEN
  const input = <TextInput field="name" placeholder="Placeholder" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the text input snapshot with required', async () => {
  // GIVEN
  const input = <TextInput field="name" required />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
