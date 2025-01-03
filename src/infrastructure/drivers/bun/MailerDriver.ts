import type { IMailerDriver } from '@adapter/spi/drivers/MailerSpi'
import type { FilterDto } from '@domain/entities/Filter'
import type { MailerConfig } from '@domain/services/Mailer'
import { v4 as uuidv4 } from 'uuid'
import nodemailer, { type Transporter } from 'nodemailer'
import { Database } from 'bun:sqlite'
import type { EmailDto } from '@adapter/spi/dtos/EmailDto'

export class MailerDriver implements IMailerDriver {
  private _transporter: Transporter | SqliteTransporter

  constructor(config: MailerConfig) {
    const { host, port, user, pass, secure } = config
    if (user === '_sqlite' && pass === '_sqlite') {
      this._transporter = new SqliteTransporter(host)
    } else {
      this._transporter = nodemailer.createTransport({
        host,
        port: Number(port),
        secure,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
    }
  }

  verify = async () => {
    await this._transporter.verify()
  }

  close = async () => {
    await this._transporter.close()
  }

  send = async (toSendDto: EmailDto) => {
    await this._transporter.sendMail(toSendDto)
  }

  find = async (filter: FilterDto): Promise<EmailDto | undefined> => {
    if (this._transporter instanceof SqliteTransporter) {
      return this._transporter.find(filter)
    }
    throw new Error('not implemented')
  }
}

class SqliteTransporter {
  private _db: Database

  constructor(url: string) {
    this._db = new Database(url)
  }

  verify = async () => {
    this._db.exec(`
      CREATE TABLE IF NOT EXISTS emails (
        id TEXT PRIMARY KEY,
        "to" TEXT,
        "from" TEXT,
        subject TEXT,
        text TEXT,
        html TEXT
      );
    `)
    return true
  }

  close = async () => {
    this._db.close()
  }

  sendMail = async (toSendDto: EmailDto) => {
    const { to, from, subject, text, html } = toSendDto
    const id = uuidv4()
    const stmt = this._db.prepare(`
      INSERT INTO emails (id, "to", "from", subject, text, html) VALUES (?, ?, ?, ?, ?, ?)
    `)
    stmt.run(id, to, from, subject, text, html)
    return {
      messageId: id,
    }
  }

  find = async (filter: FilterDto): Promise<EmailDto | undefined> => {
    let query = `SELECT * FROM emails WHERE `
    const conditions: string[] = []
    const values: (string | number)[] = []

    if ('operator' in filter) {
      switch (filter.operator) {
        case 'Is':
          conditions.push(`"${filter.field}" = ?`)
          values.push(filter.value)
          break
        default:
          throw new Error(`Unsupported operator: ${filter.operator}`)
      }
    }

    query += conditions.join(' AND ')
    const stmt = this._db.prepare(query)
    const email = stmt.get(...values)
    return email as EmailDto | undefined
  }
}
