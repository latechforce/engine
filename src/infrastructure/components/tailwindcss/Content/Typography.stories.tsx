import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'

// Définition Meta pour Storybook : titre, composant, paramètres, etc.
const meta = {
  title: 'Content/Typography', // Chemin dans la hiérarchie de Storybook
  component: Typography, // Le composant à documenter
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' }, // Permet de modifier le texte via un champ texte
  },
} satisfies Meta<typeof Typography>

export default meta
// Définit le type pour les stories basées sur la meta ci-dessus
type Story = StoryObj<typeof meta>

// Définition de la story par défaut
export const Default: Story = {
  args: {
    variant: 'h1',
    children: 'Ceci est un titre H1',
  },
}
