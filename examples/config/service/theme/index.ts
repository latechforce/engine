import type { Config } from '/src'

export const configServiceThemeTailwindcss: Config = {
  name: 'App with theme',
  services: {
    theme: {
      type: 'tailwindcss',
      base: 'src/components',
    },
  },
}
