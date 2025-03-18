import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxInput } from './CheckboxInput'
import { Form } from '../../Form/Form'
import type { CheckboxInputProps } from '/domain/components/Form/Input/CheckboxInput'

const CheckboxInputWithForm = (props: CheckboxInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <CheckboxInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/CheckboxInput',
  component: CheckboxInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CheckboxInputWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'checkbox',
    label: 'Checkbox',
    description: 'This is a description',
  },
}
