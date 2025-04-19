import type { Meta, StoryObj } from '@storybook/react'
import { FormResponse } from './FormResponse'
import { FormContainer } from './Form'
import type { FormResponseProps } from '../../../../domain/components/Layouts/FormResponse'

const FormResponseWithContainer = (props: FormResponseProps) => (
  <FormContainer>
    <FormResponse {...props} />
  </FormContainer>
)

const meta = {
  title: 'Form/Response',
  component: FormResponseWithContainer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FormResponseWithContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'form-response',
    message: 'Form submitted successfully!',
  },
}
