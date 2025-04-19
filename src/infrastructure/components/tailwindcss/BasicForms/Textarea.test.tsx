import { it, expect } from 'bun:test'
import { Textarea } from './Textarea'
import { renderToString } from 'react-dom/server'

it('should match the textarea snapshot', async () => {
  // GIVEN
  const input = <Textarea field="name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with label', async () => {
  // GIVEN
  const input = <Textarea field="name" label="Name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with description', async () => {
  // GIVEN
  const input = <Textarea field="name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with label and description', async () => {
  // GIVEN
  const input = <Textarea field="name" label="Name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with placeholder', async () => {
  // GIVEN
  const input = <Textarea field="name" placeholder="Placeholder" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the textarea snapshot with required', async () => {
  // GIVEN
  const input = <Textarea field="name" required />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
