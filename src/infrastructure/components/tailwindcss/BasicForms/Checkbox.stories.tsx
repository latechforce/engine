import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'
import { Form } from '../Layouts/Form'
import type { CheckboxProps } from '/domain/components/BasicForms/Checkbox'

const CheckboxWithForm = (props: CheckboxProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <Checkbox {...props} />
  </Form>
)

const meta = {
  title: 'Form/Checkbox',
  component: CheckboxWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CheckboxWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'checkbox',
    label: 'Checkbox',
    description: 'This is a description',
  },
}

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
}
