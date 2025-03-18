import type { Preview } from '@storybook/react'
import { useEffect } from 'react'

import './output.css'

declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void
    }
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorators = [
  (Story) => {
    useEffect(() => {
      const initPreline = () => {
        if (document.readyState === 'complete') {
          if (typeof window !== 'undefined' && window.HSStaticMethods) {
            try {
              window.HSStaticMethods.autoInit()
            } catch (error) {
              console.warn('Failed to initialize Preline:', error)
            }
          }
        } else {
          setTimeout(initPreline, 100)
        }
      }
      initPreline()
      return () => {
        // Cleanup if needed
      }
    }, [])

    return <Story />
  },
]

export default preview
