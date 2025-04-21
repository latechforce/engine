import type { Meta, StoryObj } from '@storybook/react'
import { H2 } from './H2'

// Définition Meta pour Storybook : titre, composant, paramètres, etc.
const meta = {
  title: 'Typography/H2', // Chemin dans la hiérarchie de Storybook
  component: H2, // Le composant à documenter
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' }, // Permet de modifier le texte via un champ texte
  },
} satisfies Meta<typeof H2>

export default meta
// Définit le type pour les stories basées sur la meta ci-dessus
type Story = StoryObj<typeof meta>

// Définition de la story par défaut
export const Default: Story = {
  args: {
    // Les props passées au composant H2 pour cette story
    children: 'Ceci est un titre H2',
  },
}
