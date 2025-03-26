import { it, expect } from 'bun:test'
import { LongTextInput } from './LongTextInput'
import { renderToString } from 'react-dom/server'

it('should match the textarea snapshot', async () => {
  // GIVEN
  const input = <LongTextInput field="name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with label', async () => {
  // GIVEN
  const input = <LongTextInput field="name" label="Name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with description', async () => {
  // GIVEN
  const input = <LongTextInput field="name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with label and description', async () => {
  // GIVEN
  const input = <LongTextInput field="name" label="Name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with placeholder', async () => {
  // GIVEN
  const input = <LongTextInput field="name" placeholder="Placeholder" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with required', async () => {
  // GIVEN
  const input = <LongTextInput field="name" required />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
