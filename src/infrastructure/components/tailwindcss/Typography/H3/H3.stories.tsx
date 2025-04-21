import type { Meta, StoryObj } from '@storybook/react'
import { H3 } from './H3'

// Définition Meta pour Storybook : titre, composant, paramètres, etc.
const meta = {
  title: 'Typography/H3', // Chemin dans la hiérarchie de Storybook
  component: H3, // Le composant à documenter
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' }, // Permet de modifier le texte via un champ texte
  },
} satisfies Meta<typeof H3>

export default meta
// Définit le type pour les stories basées sur la meta ci-dessus
type Story = StoryObj<typeof meta>

// Définition de la story par défaut
export const Default: Story = {
  args: {
    // Les props passées au composant H3 pour cette story
    children: 'Ceci est un titre H3',
  },
}
