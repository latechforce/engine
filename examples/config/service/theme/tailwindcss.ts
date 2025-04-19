import type { Config } from '/src'

export const tailwindcss: Config = {
  name: 'App with tailwindcss theme',
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
    theme: { type: 'tailwindcss', base: 'src/infrastructure/components/tailwindcss' },
  },
}
