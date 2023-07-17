import fs from 'fs-extra'
import { join } from 'path'
import debug from 'debug'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { InMemoryOrm } from '@infrastructure/orm/InMemoryOrm'
import { AppDto } from '@application/dtos/AppDto'

const log = debug('specs:app')

interface Env {
  [key: string]: string
}

export class App {
  private port: number
  private server?: ChildProcessWithoutNullStreams

  constructor(port: number) {
    this.port = port
  }

  async start(appSchema: AppDto, env: Env = {}): Promise<InMemoryOrm> {
    await fs.ensureDir(join(__dirname, './tmp/' + this.port))
    const appFolder = join(process.cwd(), `specs/tmp/${this.port}`)
    await fs.writeJSON(join(appFolder, 'app.json'), appSchema)
    this.server = await new Promise((resolve, reject) => {
      const server = spawn('node', ['dist/src/infrastructure/app.js'], {
        env: { ...process.env, FOUNDATION_APP_FOLDER: appFolder, PORT: String(this.port), ...env },
      })
      server.stdout.on('data', (data) => {
        const output = data.toString()
        if (output.includes('Server is running')) {
          resolve(server)
        }
      })
      server.on('error', (error) => {
        log(`Error: ${error.message}`)
        reject(error)
      })
    })
    this.server.stdout.on('data', (data) => {
      log(`Server console: ${data.toString()}`)
    })
    this.server.stderr.on('data', (data) => {
      log(`Server error: ${data.toString()}`)
    })
    return new InMemoryOrm(appFolder)
  }

  async stop(): Promise<void> {
    if (this.server) {
      this.server.kill('SIGTERM')
      this.server = undefined
    }
    await fs.remove(join(__dirname, './tmp/' + this.port))
  }
}
