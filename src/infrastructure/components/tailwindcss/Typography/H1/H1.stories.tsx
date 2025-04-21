import type { Meta, StoryObj } from '@storybook/react'
import { H1 } from './H1'

// Définition Meta pour Storybook : titre, composant, paramètres, etc.
const meta = {
  title: 'Typography/H1', // Chemin dans la hiérarchie de Storybook
  component: H1, // Le composant à documenter
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' }, // Permet de modifier le texte via un champ texte
  },
} satisfies Meta<typeof H1>

export default meta
// Définit le type pour les stories basées sur la meta ci-dessus
type Story = StoryObj<typeof meta>

// Définition de la story par défaut
export const Default: Story = {
  args: {
    // Les props passées au composant H1 pour cette story
    children: 'Ceci est un titre H1',
  },
}
