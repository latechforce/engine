import type { AppSchema } from '@/types'

export const globalsRunJavascriptCodeAction: AppSchema = {
  automations: [
    {
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'run-javascript',
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'runJavascriptCode',
          code: String(async function () {
            // Test URLSearchParams
            const params = new URLSearchParams()
            params.set('date', new Date('2025-01-01').toISOString())

            // Test Date
            const date = new Date()

            // Test Array
            const array = [1, 2, 3]

            // Test Number
            const number = new Number(42)

            // Test Boolean
            const boolean = new Boolean(true)

            // Test Math
            const mathResult = Math.max(1, 2, 3)

            // Test TextEncoder/Decoder
            const encoder = new TextEncoder()
            const decoder = new TextDecoder()
            const encoded = encoder.encode('test')
            const decoded = decoder.decode(encoded)

            // Test Blob
            const blob = new Blob(['test'], { type: 'text/plain' })

            // Test console
            console.log('Testing console.log')

            // Test setTimeout
            await new Promise((resolve) => setTimeout(resolve, 100))

            return {
              date: params.get('date'),
              currentDate: date.toISOString(),
              array: array.toString(),
              number: number.toString(),
              boolean: boolean.toString(),
              mathResult,
              encoded: Array.from(encoded),
              decoded,
              blobSize: blob.size,
              blobType: blob.type,
            }
          }),
        },
      ],
    },
  ],
}
