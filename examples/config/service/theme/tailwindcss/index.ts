import type { Config } from '/src'

export const configServiceThemeTailwindcss: Config = {
  name: 'App with tailwindcss theme',
  services: {
    theme: {
      type: 'tailwindcss',
    },
  },
}
