import { it, expect } from 'bun:test'
import { SelectInput } from './SelectInput'
import { renderToString } from 'react-dom/server'

it('should match the select input snapshot', async () => {
  // GIVEN
  const input = <SelectInput field="name" options={['Option 1', 'Option 2', 'Option 3']} />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the select input snapshot with label', async () => {
  // GIVEN
  const input = (
    <SelectInput field="name" label="Name" options={['Option 1', 'Option 2', 'Option 3']} />
  )

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the select input snapshot with description', async () => {
  // GIVEN
  const input = (
    <SelectInput
      field="name"
      description="Description"
      options={['Option 1', 'Option 2', 'Option 3']}
    />
  )

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the select input snapshot with label and description', async () => {
  // GIVEN
  const input = (
    <SelectInput
      field="name"
      label="Name"
      description="Description"
      options={['Option 1', 'Option 2', 'Option 3']}
    />
  )

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the select input snapshot with placeholder', async () => {
  // GIVEN
  const input = (
    <SelectInput
      field="name"
      placeholder="Placeholder"
      options={['Option 1', 'Option 2', 'Option 3']}
    />
  )

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})

it('should match the select input snapshot with required', async () => {
  // GIVEN
  const input = <SelectInput field="name" required options={['Option 1', 'Option 2', 'Option 3']} />

  // WHEN
  const html = renderToString(input)

  // THEN
  expect(html).toMatchSnapshot()
})
