import { it, expect } from 'bun:test'
import { renderToString } from 'react-dom/server'
import { Checkbox } from './Checkbox'

it('should match the checkbox input snapshot', async () => {
  // GIVEN
  const input = <Checkbox field="name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the checkbox input snapshot with label', async () => {
  // GIVEN
  const input = <Checkbox field="name" label="Name" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the checkbox input snapshot with description', async () => {
  // GIVEN
  const input = <Checkbox field="name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the checkbox input snapshot with label and description', async () => {
  // GIVEN
  const input = <Checkbox field="name" label="Name" description="Description" />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the checkbox input snapshot with required', async () => {
  // GIVEN
  const input = <Checkbox field="name" required />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
