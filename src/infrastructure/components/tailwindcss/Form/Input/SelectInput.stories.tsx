import type { Meta, StoryObj } from '@storybook/react'

import { SelectInput } from './SelectInput'
import { Form } from '../Form'
import type { SelectInputProps } from '/domain/components/Form/Input/SelectInput'

const SelectInputWithForm = (props: SelectInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <SelectInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/SelectInput',
  component: SelectInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SelectInputWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'single_select',
    label: 'Single Select',
    description: 'This is a description',
    placeholder: 'Select an option',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
}

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
}
