import type { EnvSchema } from '@/types'
import { test as base, type Page } from '@playwright/test'
import { spawn, ChildProcess } from 'child_process'
import { createInterface } from 'readline'
import { Readable } from 'stream'
import fs from 'fs'

// Declare your fixture types
type StartAppFixture = {
  startExampleApp: (options?: {
    filter?: string
    loggedOnAdmin?: boolean
    env?: Partial<EnvSchema>
  }) => Promise<Page>
}

// Extend the base test type
export const test = base.extend<StartAppFixture>({
  startExampleApp: async ({ browser }, use) => {
    let proc: ChildProcess | undefined
    let page: Page | undefined
    let env: Partial<EnvSchema> | undefined

    const startExampleApp = async (
      options: { filter?: string; loggedOnAdmin?: boolean; env?: Partial<EnvSchema> } = {}
    ): Promise<Page> => {
      const { filter, loggedOnAdmin = false } = options

      env = options.env || {}

      const command = ['run', 'script/run-example.ts']
      if (filter) command.push(filter)

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

      return page
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
