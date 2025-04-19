import type { Meta, StoryObj } from '@storybook/react'

import { AdvancedSelect } from './AdvancedSelect'
import { Form } from '../Layouts/Form'
import type { AdvancedSelectProps } from '/domain/components/AdvancedForms/AdvancedSelect'

const AdvancedSelectWithForm = (props: AdvancedSelectProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <AdvancedSelect {...props} />
  </Form>
)

const meta = {
  title: 'Form/AdvancedSelect',
  component: AdvancedSelectWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AdvancedSelectWithForm>

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
