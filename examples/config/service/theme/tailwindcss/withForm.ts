import type { Config } from '/src'

export const configServiceThemeTailwindcssWithForm: Config = {
  name: 'App with tailwindcss theme and form',
  forms: [
    {
      name: 'Form',
      path: '/user',
      table: 'users',
      inputs: [],
    },
  ],
  tables: [
    {
      name: 'users',
      fields: [],
    },
  ],
  services: {
    theme: {
      type: 'tailwindcss',
    },
  },
}
