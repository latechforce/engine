import type { Meta, StoryObj } from '@storybook/react'
import { Form, FormResponse, FormContainer } from './Form'
import { Input } from './Input'

const meta = {
  title: 'Form/Form',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form id="form" title="Form" description="This is a form" submitLabel="Submit">
      <Input
        field="name"
        type="text"
        label="Name"
        description="This is a description"
        placeholder="Enter your name"
        required={true}
      />
    </Form>
  ),
}

export const Response: Story = {
  render: () => (
    <FormContainer>
      <FormResponse id="form" message="Form submitted successfully!" />,
    </FormContainer>
  ),
}
