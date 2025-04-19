import { it, expect } from 'bun:test'
import { FileInput } from './FileInput'
import { renderToString } from 'react-dom/server'

it('should match the file input snapshot', async () => {
  // GIVEN
  const input = <FileInput field="name" multiple={false} />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the multiple file input snapshot', async () => {
  // GIVEN
  const input = <FileInput field="name" multiple={true} />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the file input snapshot with label', async () => {
  // GIVEN
  const input = <FileInput field="name" label="Name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the file input snapshot with description', async () => {
  // GIVEN
  const input = <FileInput field="name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the file input snapshot with label and description', async () => {
  // GIVEN
  const input = <FileInput field="name" label="Name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the file input snapshot with placeholder', async () => {
  // GIVEN
  const input = <FileInput field="name" placeholder="Placeholder" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the file input snapshot with required', async () => {
  // GIVEN
  const input = <FileInput field="name" required />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
