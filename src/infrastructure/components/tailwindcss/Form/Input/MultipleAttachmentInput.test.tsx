import { it, expect } from 'bun:test'
import { MultipleAttachmentInput } from './MultipleAttachmentInput'
import { renderToString } from 'react-dom/server'

it('should match the multiple attachment input snapshot', async () => {
  // GIVEN
  const input = <MultipleAttachmentInput field="name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the multiple attachment input snapshot with label', async () => {
  // GIVEN
  const input = <MultipleAttachmentInput field="name" label="Name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the multiple attachment input snapshot with description', async () => {
  // GIVEN
  const input = <MultipleAttachmentInput field="name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the multiple attachment input snapshot with label and description', async () => {
  // GIVEN
  const input = <MultipleAttachmentInput field="name" label="Name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the multiple attachment input snapshot with placeholder', async () => {
  // GIVEN
  const input = <MultipleAttachmentInput field="name" placeholder="Placeholder" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the multiple attachment input snapshot with required', async () => {
  // GIVEN
  const input = <MultipleAttachmentInput field="name" required />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
