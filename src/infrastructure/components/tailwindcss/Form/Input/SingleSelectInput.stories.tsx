import type { Meta, StoryObj } from '@storybook/react'

import { SingleSelectInput } from './SingleSelectInput'
import { Form } from '../Form'
import type { SingleSelectInputProps } from '/domain/components/Form/Input/SingleSelectInput'

const SingleSelectInputWithForm = (props: SingleSelectInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <SingleSelectInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/SingleSelectInput',
  component: SingleSelectInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SingleSelectInputWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'text',
    label: 'Text',
    description: 'This is a description',
    placeholder: 'Select an option',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
}
