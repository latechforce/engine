import type { EnvSchema } from '@/types'
import { test as base, type Page } from '@playwright/test'
import { spawn, ChildProcess } from 'child_process'
import { createInterface } from 'readline'
import { Readable } from 'stream'
import fs from 'fs'
import { join } from 'path'

// Function to strip ANSI color codes
function stripAnsiCodes(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1B\[\d+m/g, '')
}

// Declare your fixture types
type StartAppFixture = {
  startExampleApp: (options: {
    filter?: string
    loggedOnAdmin?: boolean
    env?: Record<string, string>
    debug?: boolean
    test: typeof test
  }) => Promise<{ page: Page; env: EnvSchema }>
}

function getCallerFile(): string {
  const originalPrepareStackTrace = Error.prepareStackTrace
  Error.prepareStackTrace = (err, stackTraces) => stackTraces
  const err = new Error()
  const stack = err.stack as unknown as NodeJS.CallSite[]
  Error.prepareStackTrace = originalPrepareStackTrace
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

async function getExampleFileFilter(
  filter?: string
): Promise<{ exampleFileFilter?: string; env: Record<string, string> }> {
  const callerFile = getCallerFile()
  let exampleFileFilter = filter
  if (!filter?.includes('/')) {
    const baseExampleFile = join(
      process.cwd(),
      callerFile.replace('e2e/', 'example/').replace('.spec.ts', '')
    )
    exampleFileFilter = join(baseExampleFile, (filter ?? 'index') + '.ts')
    if (!fs.existsSync(exampleFileFilter)) {
      exampleFileFilter = baseExampleFile + '.ts'
    }
    if (fs.existsSync(exampleFileFilter)) {
      const file = await import(exampleFileFilter)
      exampleFileFilter = exampleFileFilter.replace(process.cwd(), '')
      return { exampleFileFilter, env: file.env }
    } else {
      exampleFileFilter = undefined
    }
  }
  return { exampleFileFilter, env: {} }
}

// Extend the base test type
export const test = base.extend<StartAppFixture>({
  startExampleApp: async ({ browser }, use) => {
    let proc: ChildProcess | undefined
    let page: Page | undefined
    let env: EnvSchema = {}
    let url: string | undefined

    const startExampleApp = async (options: {
      filter?: string
      loggedOnAdmin?: boolean
      env?: Partial<EnvSchema>
      debug?: boolean
      test: typeof test
    }): Promise<{ page: Page; env: EnvSchema }> => {
      const { filter, loggedOnAdmin = false, debug = false } = options
      env = options.env || {}

      const result = await getExampleFileFilter(filter)
      env = { ...result.env, ...env }
      const exampleFileFilter = result.exampleFileFilter

      if (debug && !exampleFileFilter) {
        console.log('There is no example file found for this test, loading empty app')
      }

      await test.step(`Start example app${exampleFileFilter ? ` at ${exampleFileFilter}` : ' with no config'}`, async () => {
        const command = ['run', 'script/run-example.ts']
        if (exampleFileFilter) command.push(exampleFileFilter)

        proc = spawn('bun', command, {
          env: {
            ...process.env,
            NODE_ENV: 'production',
            MOCK: '*',
            PORT: '*',
            DATABASE_PROVIDER: 'sqlite',
            DATABASE_URL: ':memory:',
            LOG_LEVEL: debug ? 'debug' : process.env.LOG_LEVEL,
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

        url = await new Promise<string>((resolve, reject) => {
          rl.on('line', async (line) => {
            if (debug) {
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
                reject(stripAnsiCodes(data.toString()))
              }
            })
          }
        })
      })

      await test.step('Create app page', async () => {
        page = await browser.newPage({
          baseURL: url,
        })
      })

      if (loggedOnAdmin) {
        await test.step('Login as admin', async () => {
          await page?.goto('/admin/login')
          await page?.locator('input#email').fill('admin@admin.com')
          await page?.locator('input#password').fill('admin')
          await page?.locator('button[type="submit"]').click()
          await page?.waitForURL('/admin')
        })
      }

      return { page: page!, env }
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
