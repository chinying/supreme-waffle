import nodemailer from 'nodemailer'

import { ConfigService } from './config.service'

const configService = new ConfigService()

interface MailCredentials {
  host: string
  port: number
  auth: {
    user: string
    pass: string
  }
}

interface SendMailInput {
  recipients: Array<string>
  subject: string
  body: string
}

class MailClient {
  private _mailer: nodemailer.Transporter
  constructor(credentials: MailCredentials) {
    const { host, port, auth } = credentials
    this._mailer = nodemailer.createTransport({
      host: host,
      port: +port,
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
    })
  }

  async sendMail(input: SendMailInput): Promise<void> {
    return new Promise((resolve, reject) => {
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'noreply@example.com',
        to: input.recipients,
        subject: input.subject,
        html: input.body,
      }

      this._mailer.sendMail(mailOptions, (err, info) => {
        if (err !== null) {
          reject(new Error(`${err}`))
        } else {
          resolve(info.messageId)
        }
      })
    })
  }
}

const client = new MailClient(configService.get('mailer.aws'))
const MailService = {
  client,
}
export { MailClient, MailService, SendMailInput }
