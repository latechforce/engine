import type { EnvSchema } from '@/types'
import { test as base, type Page } from '@playwright/test'
import { spawn, ChildProcess } from 'child_process'
import { createInterface } from 'readline'
import { Readable } from 'stream'
import fs from 'fs'
import { join } from 'path'

// Declare your fixture types
type StartAppFixture = {
  startExampleApp: (options?: {
    filter?: string
    loggedOnAdmin?: boolean
    env?: Partial<EnvSchema>
  }) => Promise<{ page: Page; env: EnvSchema }>
}

function getCallerFile(): string {
  const originalPrepareStackTrace = Error.prepareStackTrace

  Error.prepareStackTrace = (err, stackTraces) => stackTraces

  const err = new Error()
  const stack = err.stack as unknown as NodeJS.CallSite[]

  Error.prepareStackTrace = originalPrepareStackTrace

  // Find the first caller that is in our e2e directory and is a .spec.ts file
  const caller = stack?.find((callSite) => {
    const fileName = callSite.getFileName()
    return fileName?.includes('/e2e/') && fileName?.includes('.spec.ts')
  })

  const fileName = caller?.getFileName()
  if (!fileName) {
    throw new Error('Caller spec file not found')
  }
  return fileName?.replace('file://', '').replace(process.cwd(), '')
}

// Extend the base test type
export const test = base.extend<StartAppFixture>({
  startExampleApp: async ({ browser }, use) => {
    let proc: ChildProcess | undefined
    let page: Page | undefined
    let env: EnvSchema = {}

    const startExampleApp = async (
      options: { filter?: string; loggedOnAdmin?: boolean; env?: Partial<EnvSchema> } = {}
    ): Promise<{ page: Page; env: EnvSchema }> => {
      const { filter, loggedOnAdmin = false } = options
      env = options.env || {}

      const command = ['run', 'script/run-example.ts']

      const callerFile = getCallerFile()
      if (!callerFile.includes('default') && !filter?.includes('/')) {
        const baseExampleFile = join(
          process.cwd(),
          callerFile.replace('e2e', 'example').replace('.spec.ts', '')
        )
        let exampleFile = join(baseExampleFile, (filter ?? 'index') + '.ts')

        if (!fs.existsSync(exampleFile)) {
          exampleFile = baseExampleFile + '.ts'
        }

        if (fs.existsSync(exampleFile)) {
          const file = await import(exampleFile)
          env = { ...file.env, ...env }
          command.push(exampleFile)
        } else {
          throw new Error(`Example file ${exampleFile.replace(process.cwd(), '')} not found`)
        }
      } else if (filter) {
        command.push(filter)
      }

      proc = spawn('bun', command, {
        env: {
          ...process.env,
          NODE_ENV: 'production',
          ...env,
        },
        stdio: ['pipe', 'pipe', 'pipe'],
      })

      if (!proc.stdout) {
        throw new Error('Process stdout is null')
      }

      const rl = createInterface({
        input: proc.stdout as Readable,
        crlfDelay: Infinity,
      })

      const url = await new Promise<string>((resolve, reject) => {
        rl.on('line', async (line) => {
          if (env.LOG_LEVEL) {
            console.log(line)
          }
          const urlMatch = line.match(/http:\/\/localhost:(\d+)/)
          if (urlMatch) {
            const url = urlMatch[0]
            resolve(url)
          }
        })

        if (proc?.stderr) {
          proc.stderr.on('data', (data) => {
            if (!data.includes('[Better Auth]')) {
              reject(data.toString())
            }
          })
        }
      })

      // Set the baseURL for the page
      page = await browser.newPage({
        baseURL: url,
      })

      if (loggedOnAdmin) {
        await page.goto('/_admin/login')
        await page.locator('input#email').fill('admin@admin.com')
        await page.locator('input#password').fill('admin')
        await page.locator('button[type="submit"]').click()
        await page.waitForURL('/_admin')
      }

      return { page, env }
    }

    // Provide the fixture value
    await use(startExampleApp)

    // Cleanup after the test
    if (proc) {
      proc.kill()
    }

    if (page) {
      await page.close()
    }

    if (env?.DATABASE_URL) {
      if (fs.existsSync(env.DATABASE_URL)) {
        fs.unlinkSync(env.DATABASE_URL)
      }
    }
  },
})

export { expect } from '@playwright/test'
